import { useShoppingCart } from '@automattic/shopping-cart';
import { resolveDeviceTypeByViewPort } from '@automattic/viewport';
import { isURL } from '@wordpress/url';
import debugFactory from 'debug';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { recordPurchase } from 'calypso/lib/analytics/record-purchase';
import { hasEcommercePlan } from 'calypso/lib/cart-values/cart-items';
import useSiteDomains from 'calypso/my-sites/checkout/composite-checkout/hooks/use-site-domains';
import getThankYouPageUrl from 'calypso/my-sites/checkout/get-thank-you-page-url';
import useCartKey from 'calypso/my-sites/checkout/use-cart-key';
import {
	retrieveSignupDestination,
	clearSignupDestinationCookie,
} from 'calypso/signup/storageUtils';
import { recordTracksEvent } from 'calypso/state/analytics/actions';
import { clearPurchases } from 'calypso/state/purchases/actions';
import { fetchReceiptCompleted } from 'calypso/state/receipts/actions';
import isAtomicSite from 'calypso/state/selectors/is-site-automated-transfer';
import { requestSite } from 'calypso/state/sites/actions';
import { fetchSiteFeatures } from 'calypso/state/sites/features/actions';
import {
	isJetpackSite,
	getJetpackCheckoutRedirectUrl,
	isBackupPluginActive,
	isSearchPluginActive,
} from 'calypso/state/sites/selectors';
import { getSelectedSite, getSelectedSiteId } from 'calypso/state/ui/selectors';
import { recordCompositeCheckoutErrorDuringAnalytics } from '../lib/analytics';
import normalizeTransactionResponse from '../lib/normalize-transaction-response';
import { absoluteRedirectThroughPending, redirectThroughPending } from '../lib/pending-page';
import { translateCheckoutPaymentMethodToWpcomPaymentMethod } from '../lib/translate-payment-method-names';
import type {
	PaymentEventCallback,
	PaymentEventCallbackArguments,
} from '@automattic/composite-checkout';
import type { ResponseCart } from '@automattic/shopping-cart';
import type { WPCOMTransactionEndpointResponse } from '@automattic/wpcom-checkout';
import type { PostCheckoutUrlArguments } from 'calypso/my-sites/checkout/get-thank-you-page-url';
import type { CalypsoDispatch } from 'calypso/state/types';

const debug = debugFactory( 'calypso:composite-checkout:use-on-payment-complete' );

/**
 * Generates a callback to be called after checkout is successfully complete.
 *
 * IMPORTANT NOTE: This will not be called for redirect payment methods like
 * PayPal. They will redirect directly to the post-checkout page decided by
 * `getThankYouUrl`.
 */
export default function useCreatePaymentCompleteCallback( {
	createUserAndSiteBeforeTransaction,
	productAliasFromUrl,
	redirectTo,
	purchaseId,
	feature,
	isInModal,
	isComingFromUpsell,
	disabledThankYouPage,
	siteSlug,
	isJetpackCheckout = false,
	checkoutFlow,
}: {
	createUserAndSiteBeforeTransaction?: boolean;
	productAliasFromUrl?: string | undefined;
	redirectTo?: string | undefined;
	purchaseId?: number | undefined;
	feature?: string | undefined;
	isInModal?: boolean;
	isComingFromUpsell?: boolean;
	disabledThankYouPage?: boolean;
	siteSlug: string | undefined;
	isJetpackCheckout?: boolean;
	checkoutFlow?: string;
} ): PaymentEventCallback {
	const cartKey = useCartKey();
	const { responseCart, reloadFromServer: reloadCart } = useShoppingCart( cartKey );
	const reduxDispatch = useDispatch();
	const siteId = useSelector( getSelectedSiteId );
	const selectedSiteData = useSelector( getSelectedSite );
	const adminUrl = selectedSiteData?.options?.admin_url;
	const isJetpackNotAtomic =
		useSelector(
			( state ) =>
				siteId &&
				( isJetpackSite( state, siteId ) ||
					isBackupPluginActive( state, siteId ) ||
					isSearchPluginActive( state, siteId ) ) &&
				! isAtomicSite( state, siteId )
		) || false;
	const adminPageRedirect = useSelector( ( state ) =>
		getJetpackCheckoutRedirectUrl( state, siteId )
	);

	const domains = useSiteDomains( siteId ?? undefined );

	return useCallback(
		( { paymentMethodId, transactionLastResponse }: PaymentEventCallbackArguments ): void => {
			debug( 'payment completed successfully' );
			const transactionResult = normalizeTransactionResponse( transactionLastResponse );

			// In the case of a Jetpack product site-less purchase, we need to include the blog ID of the
			// created site in the Thank You page URL.
			let jetpackTemporarySiteId;
			if ( isJetpackCheckout && ! siteSlug && responseCart.create_new_blog ) {
				jetpackTemporarySiteId =
					transactionResult.purchases && Object.keys( transactionResult.purchases ).pop();
			}

			const getThankYouPageUrlArguments: PostCheckoutUrlArguments = {
				siteSlug: siteSlug || undefined,
				adminUrl,
				receiptId: transactionResult.receipt_id,
				redirectTo,
				purchaseId,
				feature,
				cart: responseCart,
				isJetpackNotAtomic,
				productAliasFromUrl,
				hideNudge: isComingFromUpsell,
				isInModal,
				isJetpackCheckout,
				jetpackTemporarySiteId,
				adminPageRedirect,
				domains,
			};

			debug( 'getThankYouUrl called with', getThankYouPageUrlArguments );
			const url = getThankYouPageUrl( getThankYouPageUrlArguments );
			debug( 'getThankYouUrl returned', url );

			try {
				recordPaymentCompleteAnalytics( {
					paymentMethodId,
					transactionResult,
					redirectUrl: url,
					responseCart,
					checkoutFlow,
					reduxDispatch,
				} );
			} catch ( err ) {
				// eslint-disable-next-line no-console
				console.error( err );
				reduxDispatch(
					recordCompositeCheckoutErrorDuringAnalytics( {
						errorObject: err as Error,
						failureDescription: 'useCreatePaymentCompleteCallback',
					} )
				);
			}

			const receiptId = transactionResult?.receipt_id;
			debug( 'transactionResult was', transactionResult );

			reduxDispatch( clearPurchases() );

			// Removes the destination cookie only if redirecting to the signup destination.
			// (e.g. if the destination is an upsell nudge, it does not remove the cookie).
			const destinationFromCookie = retrieveSignupDestination();
			if ( url.includes( destinationFromCookie ) ) {
				debug( 'clearing redirect url cookie' );
				clearSignupDestinationCookie();
			}

			if ( receiptId && transactionResult?.purchases ) {
				debug( 'fetching receipt' );
				reduxDispatch( fetchReceiptCompleted( receiptId, transactionResult ) );
			}

			if ( siteId ) {
				reduxDispatch( requestSite( siteId ) );
				reduxDispatch( fetchSiteFeatures( siteId ) );
			}

			// Checkout in the modal might not need thank you page.
			// For example, Focused Launch is showing a success dialog directly in editor instead of a thank you page.
			// See https://github.com/Automattic/wp-calypso/pull/47808#issuecomment-755196691
			if ( isInModal && disabledThankYouPage && ! hasEcommercePlan( responseCart ) ) {
				return;
			}

			debug( 'just redirecting to', url );

			if ( createUserAndSiteBeforeTransaction ) {
				try {
					window.localStorage.removeItem( 'shoppingCart' );
					window.localStorage.removeItem( 'siteParams' );
				} catch ( err ) {
					debug( 'error while clearing localStorage cart' );
				}

				// We use window.location instead of page() so that the cookies are
				// detected on fresh page load. Using page(url) will take us to the
				// log-in page which we don't want.
				absoluteRedirectThroughPending( url, {
					siteSlug,
					orderId: transactionResult.order_id,
					receiptId: transactionResult.receipt_id,
				} );
				return;
			}

			// We need to do a hard redirect if we're redirecting to the stepper.
			// Since stepper is self-contained, it doesn't load properly if we do a normal history state change
			if ( isURL( url ) || url.includes( '/setup/' ) ) {
				absoluteRedirectThroughPending( url, {
					siteSlug,
					orderId: transactionResult.order_id,
					receiptId: transactionResult.receipt_id,
				} );
				return;
			}

			reloadCart();
			redirectThroughPending( url, {
				siteSlug,
				orderId: transactionResult.order_id,
				receiptId: transactionResult.receipt_id,
			} );
		},
		[
			reloadCart,
			siteSlug,
			adminUrl,
			redirectTo,
			purchaseId,
			feature,
			isJetpackNotAtomic,
			productAliasFromUrl,
			isComingFromUpsell,
			isInModal,
			reduxDispatch,
			siteId,
			responseCart,
			createUserAndSiteBeforeTransaction,
			disabledThankYouPage,
			isJetpackCheckout,
			checkoutFlow,
			adminPageRedirect,
			domains,
		]
	);
}

function recordPaymentCompleteAnalytics( {
	paymentMethodId,
	transactionResult,
	redirectUrl,
	responseCart,
	checkoutFlow,
	reduxDispatch,
}: {
	paymentMethodId: string | null;
	transactionResult: WPCOMTransactionEndpointResponse | undefined;
	redirectUrl: string;
	responseCart: ResponseCart;
	checkoutFlow?: string;
	reduxDispatch: CalypsoDispatch;
} ) {
	const wpcomPaymentMethod = paymentMethodId
		? translateCheckoutPaymentMethodToWpcomPaymentMethod( paymentMethodId )
		: null;

	const device = resolveDeviceTypeByViewPort();
	reduxDispatch(
		recordTracksEvent( 'calypso_checkout_payment_success', {
			coupon_code: responseCart.coupon,
			currency: responseCart.currency,
			payment_method: wpcomPaymentMethod || '',
			total_cost: responseCart.total_cost,
			device,
		} )
	);

	try {
		recordPurchase( {
			cart: responseCart,
			orderId: transactionResult?.receipt_id,
		} );
	} catch ( err ) {
		// eslint-disable-next-line no-console
		console.error( err );
		reduxDispatch(
			recordCompositeCheckoutErrorDuringAnalytics( {
				errorObject: err as Error,
				failureDescription: 'useCreatePaymentCompleteCallback',
			} )
		);
	}

	return reduxDispatch(
		recordTracksEvent( 'calypso_checkout_composite_payment_complete', {
			redirect_url: redirectUrl,
			coupon_code: responseCart.coupon,
			total: responseCart.total_cost_integer,
			currency: responseCart.currency,
			payment_method: wpcomPaymentMethod || '',
			device,
			checkout_flow: checkoutFlow,
		} )
	);
}
