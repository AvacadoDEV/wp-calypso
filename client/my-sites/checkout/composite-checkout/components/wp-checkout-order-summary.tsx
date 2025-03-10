import {
	getPlan,
	getYearlyPlanByMonthly,
	isDomainProduct,
	isDomainTransfer,
	isMonthly,
	isNoAds,
	isPlan,
	isWpComBusinessPlan,
	isWpComEcommercePlan,
	isWpComPersonalPlan,
	isWpComPlan,
	isWpComPremiumPlan,
	isJetpackProduct,
} from '@automattic/calypso-products';
import { Gridicon } from '@automattic/components';
import {
	CheckoutCheckIcon,
	CheckoutSummaryCard as CheckoutSummaryCardUnstyled,
	FormStatus,
	useFormStatus,
} from '@automattic/composite-checkout';
import { isNewsletterOrLinkInBioFlow } from '@automattic/onboarding';
import { useShoppingCart } from '@automattic/shopping-cart';
import {
	getCouponLineItemFromCart,
	getTaxBreakdownLineItemsFromCart,
	getTotalLineItemFromCart,
} from '@automattic/wpcom-checkout';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useTranslate } from 'i18n-calypso';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { isWcMobileApp } from 'calypso/lib/mobile-app';
import useCartKey from 'calypso/my-sites/checkout/use-cart-key';
import { getSignupCompleteFlowName } from 'calypso/signup/storageUtils';
import { getCurrentPlan } from 'calypso/state/sites/plans/selectors';
import getFlowPlanFeatures from '../lib/get-flow-plan-features';
import getJetpackProductFeatures from '../lib/get-jetpack-product-features';
import getPlanFeatures from '../lib/get-plan-features';
import { getRefundPolicies, getRefundWindows, RefundPolicy } from './refund-policies';
import type { ResponseCart, ResponseCartProduct } from '@automattic/shopping-cart';
import type { TranslateResult } from 'i18n-calypso';

// This will make converting to TS less noisy. The order of components can be reorganized later
/* eslint-disable @typescript-eslint/no-use-before-define */

export default function WPCheckoutOrderSummary( {
	siteId,
	onChangePlanLength,
	nextDomainIsFree = false,
}: {
	siteId: number | undefined;
	onChangePlanLength: ( uuid: string, productSlug: string, productId: number ) => void;
	nextDomainIsFree?: boolean;
} ) {
	const translate = useTranslate();
	const { formStatus } = useFormStatus();
	const cartKey = useCartKey();
	const { responseCart } = useShoppingCart( cartKey );

	const hasRenewalInCart = responseCart.products.some(
		( product ) => product.extra.purchaseType === 'renewal'
	);

	const isCartUpdating = FormStatus.VALIDATING === formStatus;
	const isWcMobile = isWcMobileApp();

	const plan = responseCart.products.find( ( product ) => isPlan( product ) );
	const hasMonthlyPlanInCart = Boolean( plan && isMonthly( plan?.product_slug ) );

	return (
		<CheckoutSummaryCard
			className={ isCartUpdating ? 'is-loading' : '' }
			data-e2e-cart-is-loading={ isCartUpdating }
		>
			<CheckoutSummaryFeatures>
				<CheckoutSummaryFeaturesTitle>
					{ responseCart.is_gift_purchase
						? translate( 'WordPress.com Gift Subscription' )
						: translate( 'Included with your purchase' ) }
				</CheckoutSummaryFeaturesTitle>
				{ isCartUpdating ? (
					<LoadingCheckoutSummaryFeaturesList />
				) : (
					<CheckoutSummaryFeaturesWrapper siteId={ siteId } nextDomainIsFree={ nextDomainIsFree } />
				) }
			</CheckoutSummaryFeatures>
			{ ! isCartUpdating && ! hasRenewalInCart && ! isWcMobile && plan && hasMonthlyPlanInCart && (
				<CheckoutSummaryAnnualUpsell plan={ plan } onChangePlanLength={ onChangePlanLength } />
			) }
			<CheckoutSummaryPriceList />
		</CheckoutSummaryCard>
	);
}

function CheckoutSummaryPriceList() {
	const cartKey = useCartKey();
	const { responseCart } = useShoppingCart( cartKey );
	const couponLineItem = getCouponLineItemFromCart( responseCart );
	const taxLineItems = getTaxBreakdownLineItemsFromCart( responseCart );
	const totalLineItem = getTotalLineItemFromCart( responseCart );
	const translate = useTranslate();

	return (
		<CheckoutSummaryAmountWrapper>
			{ couponLineItem && (
				<CheckoutSummaryLineItem key={ 'checkout-summary-line-item-' + couponLineItem.id }>
					<span>{ couponLineItem.label }</span>
					<span>{ couponLineItem.amount.displayValue }</span>
				</CheckoutSummaryLineItem>
			) }
			{ taxLineItems.map( ( taxLineItem ) => (
				<CheckoutSummaryLineItem key={ 'checkout-summary-line-item-' + taxLineItem.id }>
					<span>{ taxLineItem.label }</span>
					<span>{ taxLineItem.amount.displayValue }</span>
				</CheckoutSummaryLineItem>
			) ) }
			<CheckoutSummaryTotal>
				<span>{ translate( 'Total' ) }</span>
				<span className="wp-checkout-order-summary__total-price">
					{ totalLineItem.amount.displayValue }
				</span>
			</CheckoutSummaryTotal>
		</CheckoutSummaryAmountWrapper>
	);
}

function LoadingCheckoutSummaryFeaturesList() {
	return (
		<>
			<LoadingCopy />
			<LoadingCopy />
			<LoadingCopy />
		</>
	);
}

function SwitchToAnnualPlan( {
	plan,
	onChangePlanLength,
	linkText,
}: {
	plan: ResponseCartProduct;
	onChangePlanLength: ( uuid: string, productSlug: string, productId: number ) => void;
	linkText?: React.ReactNode;
} ) {
	const translate = useTranslate();
	const handleClick = () => {
		const annualPlan = getPlan( getYearlyPlanByMonthly( plan.product_slug ) );
		if ( annualPlan ) {
			onChangePlanLength?.( plan.uuid, annualPlan.getStoreSlug(), annualPlan.getProductId() );
		}
	};
	const text = linkText ?? translate( 'Switch to an annual plan and save!' );

	return <SwitchToAnnualPlanButton onClick={ handleClick }>{ text }</SwitchToAnnualPlanButton>;
}

function CheckoutSummaryFeaturesWrapper( props: {
	siteId: number | undefined;
	nextDomainIsFree: boolean;
} ) {
	const { siteId, nextDomainIsFree } = props;
	const signupFlowName = getSignupCompleteFlowName();
	const shouldUseFlowFeatureList = isNewsletterOrLinkInBioFlow( signupFlowName );
	const cartKey = useCartKey();
	const { responseCart } = useShoppingCart( cartKey );
	const giftSiteSlug = responseCart.gift_details?.receiver_blog_slug;

	if ( responseCart.is_gift_purchase && giftSiteSlug ) {
		return <CheckoutSummaryGiftFeaturesList siteSlug={ giftSiteSlug } />;
	}

	if ( signupFlowName && shouldUseFlowFeatureList ) {
		return <CheckoutSummaryFlowFeaturesList flowName={ signupFlowName } />;
	}

	return <CheckoutSummaryFeaturesList siteId={ siteId } nextDomainIsFree={ nextDomainIsFree } />;
}

function CheckoutSummaryGiftFeaturesList( { siteSlug }: { siteSlug: string } ) {
	const translate = useTranslate();
	return (
		<CheckoutSummaryFeaturesListWrapper>
			{ translate(
				'You are showing your appreciation for %(siteSlug)s by gifting them their next subscription.',
				{ args: { siteSlug } }
			) }
		</CheckoutSummaryFeaturesListWrapper>
	);
}

function CheckoutSummaryRefundWindows( { cart }: { cart: ResponseCart } ) {
	const translate = useTranslate();

	const refundPolicies = getRefundPolicies( cart );
	const refundWindows = getRefundWindows( refundPolicies );

	if ( ! refundWindows.length || refundPolicies.includes( RefundPolicy.NonRefundable ) ) {
		return null;
	}

	const allCartItemsAreDomains = refundPolicies.every(
		( refundPolicy ) =>
			refundPolicy === RefundPolicy.DomainNameRegistration ||
			refundPolicy === RefundPolicy.DomainNameRegistrationBundled ||
			refundPolicy === RefundPolicy.DomainNameRenewal
	);

	if ( allCartItemsAreDomains ) {
		return null;
	}

	const allCartItemsAreMonthlyPlanBundle = refundPolicies.every(
		( refundPolicy ) =>
			refundPolicy === RefundPolicy.DomainNameRegistration ||
			refundPolicy === RefundPolicy.PlanMonthlyBundle
	);

	const allCartItemsArePlanOrDomainRenewals = refundPolicies.every(
		( refundPolicy ) =>
			refundPolicy === RefundPolicy.DomainNameRenewal ||
			refundPolicy === RefundPolicy.PlanMonthlyRenewal ||
			refundPolicy === RefundPolicy.PlanYearlyRenewal ||
			refundPolicy === RefundPolicy.PlanBiennialRenewal
	);

	let text: TranslateResult;

	if ( refundWindows.length === 1 ) {
		const refundWindow = refundWindows[ 0 ];
		const planBundleRefundPolicy = refundPolicies.find(
			( refundPolicy ) =>
				refundPolicy === RefundPolicy.PlanBiennialBundle ||
				refundPolicy === RefundPolicy.PlanYearlyBundle
		);
		const planProduct = cart.products.find( isPlan );

		if ( planBundleRefundPolicy ) {
			// Using plural translation because some languages have multiple plural forms and no plural-agnostic.
			text = translate(
				'%(days)d-day money back guarantee for %(product)s',
				'%(days)d-day money back guarantee for %(product)s',
				{
					count: refundWindow,
					args: {
						days: refundWindow,
						product: planProduct?.product_name ?? '',
					},
				}
			);
		} else {
			text = translate( '%(days)d-day money back guarantee', '%(days)d-day money back guarantee', {
				count: refundWindow,
				args: { days: refundWindow },
			} );
		}
	} else if ( allCartItemsAreMonthlyPlanBundle || allCartItemsArePlanOrDomainRenewals ) {
		const refundWindow = Math.max( ...refundWindows );
		const planProduct = cart.products.find( isPlan );

		text = translate(
			'%(days)d-day money back guarantee for %(product)s',
			'%(days)d-day money back guarantee for %(product)s',
			{
				count: refundWindow,
				args: {
					days: refundWindow,
					product: planProduct?.product_name ?? '',
				},
			}
		);
	} else {
		const shortestRefundWindow = Math.min( ...refundWindows );

		text = translate(
			'%(days)d-day full money back guarantee',
			'%(days)d-day full money back guarantee',
			{
				count: shortestRefundWindow,
				args: { days: shortestRefundWindow },
				comment: 'The number of days until the shortest refund window in the cart expires.',
			}
		);
	}

	return (
		<CheckoutSummaryFeaturesListItem>
			<WPCheckoutCheckIcon id="features-list-refund-text" />
			{ text }
		</CheckoutSummaryFeaturesListItem>
	);
}

function CheckoutSummaryFeaturesList( props: {
	siteId: number | undefined;
	nextDomainIsFree: boolean;
} ) {
	const { siteId, nextDomainIsFree } = props;

	const cartKey = useCartKey();
	const { responseCart } = useShoppingCart( cartKey );
	const hasDomainsInCart = responseCart.products.some(
		( product ) => isDomainProduct( product ) || isDomainTransfer( product )
	);
	const domains = responseCart.products.filter(
		( product ) => isDomainProduct( product ) || isDomainTransfer( product )
	);

	const plans = responseCart.products.filter( ( product ) => isPlan( product ) );
	const hasPlanInCart = plans.length > 0;

	const jetpackProducts = responseCart.products.filter( isJetpackProduct );
	const hasJetpackProduct = jetpackProducts.length > 0;
	const hasSingleProduct = responseCart.products.length === 1;

	const translate = useTranslate();

	const hasNoAdsAddOn = responseCart.products.some( ( product ) => isNoAds( product ) );

	return (
		<CheckoutSummaryFeaturesListWrapper>
			{ hasDomainsInCart &&
				domains.map( ( domain ) => {
					return <CheckoutSummaryFeaturesListDomainItem domain={ domain } key={ domain.uuid } />;
				} ) }

			{ hasSingleProduct && hasJetpackProduct && (
				<CheckoutSummaryJetpackProductFeatures product={ jetpackProducts[ 0 ] } />
			) }

			{ hasPlanInCart && (
				<CheckoutSummaryPlanFeatures
					hasDomainsInCart={ hasDomainsInCart }
					nextDomainIsFree={ nextDomainIsFree }
				/>
			) }

			{ hasNoAdsAddOn && (
				<CheckoutSummaryFeaturesListItem>
					<WPCheckoutCheckIcon id="features-list-support-text" />
					{ translate( 'Remove ads from your site with the No Ads add-on' ) }
				</CheckoutSummaryFeaturesListItem>
			) }

			{ ! hasPlanInCart && <CheckoutSummaryChatIfAvailable siteId={ siteId } /> }

			<CheckoutSummaryRefundWindows cart={ responseCart } />
		</CheckoutSummaryFeaturesListWrapper>
	);
}

function CheckoutSummaryFlowFeaturesList( { flowName }: { flowName: string } ) {
	const cartKey = useCartKey();
	const { responseCart } = useShoppingCart( cartKey );
	const planInCart = responseCart.products.find( ( product ) => isPlan( product ) );
	const planFeatures = getFlowPlanFeatures( flowName, planInCart );

	return (
		<CheckoutSummaryFeaturesListWrapper>
			{ planFeatures.map( ( feature ) => {
				return (
					<CheckoutSummaryFeaturesListItem key={ `feature-list-${ feature.getSlug() }` }>
						<WPCheckoutCheckIcon id={ `feature-list-${ feature.getSlug() }-icon` } />
						{ feature.isHighlightedFeature ? (
							<strong>{ feature.getTitle() }</strong>
						) : (
							feature.getTitle()
						) }
					</CheckoutSummaryFeaturesListItem>
				);
			} ) }
		</CheckoutSummaryFeaturesListWrapper>
	);
}

function CheckoutSummaryFeaturesListDomainItem( { domain }: { domain: ResponseCartProduct } ) {
	const translate = useTranslate();
	const bundledDomain = translate(
		'{{strong}}%(domain)s{{/strong}} domain registration free for one year',
		{
			components: {
				strong: <strong />,
			},
			args: {
				domain: domain.meta,
			},
			comment: 'domain name and bundling message',
		}
	);

	// If domain is using existing credit or bundled with cart, show bundled text.
	if ( domain.is_bundled ) {
		return (
			<CheckoutSummaryFeaturesListItem>
				<WPCheckoutCheckIcon id={ `feature-list-domain-item-${ domain.meta }` } />
				{ bundledDomain }
			</CheckoutSummaryFeaturesListItem>
		);
	}

	return (
		<CheckoutSummaryFeaturesListItem>
			<WPCheckoutCheckIcon id={ `feature-list-domain-item-${ domain.meta }` } />
			<strong>{ domain.meta }</strong>
		</CheckoutSummaryFeaturesListItem>
	);
}

function CheckoutSummaryJetpackProductFeatures( { product }: { product: ResponseCartProduct } ) {
	const translate = useTranslate();
	const productFeatures = getJetpackProductFeatures( product, translate );

	return (
		<>
			{ productFeatures.map( ( feature ) => {
				return (
					<CheckoutSummaryFeaturesListItem key={ feature }>
						<WPCheckoutCheckIcon id={ feature.replace( /[^\w]/g, '_' ) } />
						{ feature }
					</CheckoutSummaryFeaturesListItem>
				);
			} ) }
		</>
	);
}

function CheckoutSummaryPlanFeatures( props: {
	hasDomainsInCart: boolean;
	nextDomainIsFree: boolean;
} ) {
	const { hasDomainsInCart, nextDomainIsFree } = props;

	const translate = useTranslate();
	const cartKey = useCartKey();
	const { responseCart } = useShoppingCart( cartKey );
	const planInCart = responseCart.products.find( ( product ) => isPlan( product ) );
	const hasRenewalInCart = responseCart.products.some(
		( product ) => product.extra.purchaseType === 'renewal'
	);
	const planFeatures = getPlanFeatures(
		planInCart,
		translate,
		hasDomainsInCart,
		hasRenewalInCart,
		nextDomainIsFree
	);

	return (
		<>
			{ planFeatures.map( ( feature ) => {
				const isSupported = ! feature.startsWith( '~~' );
				if ( ! isSupported ) {
					feature = feature.substr( 2 );
				}

				return (
					<CheckoutSummaryFeaturesListItem key={ String( feature ) } isSupported={ isSupported }>
						{ isSupported ? (
							<WPCheckoutCheckIcon id={ feature.replace( /[^\w]/g, '_' ) } />
						) : (
							<WPCheckoutCrossIcon />
						) }
						{ feature }
					</CheckoutSummaryFeaturesListItem>
				);
			} ) }
		</>
	);
}

function CheckoutSummaryChatIfAvailable( props: { siteId: number | undefined } ) {
	const translate = useTranslate();

	const currentPlan = useSelector( ( state ) =>
		props.siteId ? getCurrentPlan( state, props.siteId ) : undefined
	);

	const currentPlanSlug = currentPlan?.productSlug;

	const isChatAvailable =
		currentPlanSlug &&
		( isWpComPremiumPlan( currentPlanSlug ) ||
			isWpComBusinessPlan( currentPlanSlug ) ||
			isWpComEcommercePlan( currentPlanSlug ) ) &&
		! isMonthly( currentPlanSlug );

	if ( ! isChatAvailable ) {
		return null;
	}

	return (
		<CheckoutSummaryFeaturesListItem>
			<WPCheckoutCheckIcon id="annual-live-chat" />
			{ translate( 'Live chat support' ) }
		</CheckoutSummaryFeaturesListItem>
	);
}

function CheckoutSummaryAnnualUpsell( props: {
	plan: ResponseCartProduct;
	onChangePlanLength: ( uuid: string, productSlug: string, productId: number ) => void;
} ) {
	const translate = useTranslate();
	const productSlug = props.plan?.product_slug;

	if ( ! productSlug || ! isWpComPlan( productSlug ) ) {
		return null;
	}

	return (
		<CheckoutSummaryFeaturesUpsell>
			<CheckoutSummaryFeaturesTitle>
				<SwitchToAnnualPlan
					plan={ props.plan }
					onChangePlanLength={ props.onChangePlanLength }
					linkText={ translate( 'Included with an annual plan' ) }
				/>
			</CheckoutSummaryFeaturesTitle>
			<CheckoutSummaryFeaturesListWrapper>
				<CheckoutSummaryFeaturesListItem isSupported={ false }>
					<WPCheckoutCheckIcon id="annual-domain-credit" />
					{ translate( 'Free domain for one year' ) }
				</CheckoutSummaryFeaturesListItem>
				{ ! isWpComPersonalPlan( productSlug ) && (
					<CheckoutSummaryFeaturesListItem isSupported={ false }>
						<WPCheckoutCheckIcon id="annual-live-chat" />
						{ translate( 'Live chat support' ) }
					</CheckoutSummaryFeaturesListItem>
				) }
			</CheckoutSummaryFeaturesListWrapper>
			<SwitchToAnnualPlan plan={ props.plan } onChangePlanLength={ props.onChangePlanLength } />
		</CheckoutSummaryFeaturesUpsell>
	);
}

const pulse = keyframes`
	0% { opacity: 1; }

	70% { opacity: 0.25; }

	100% { opacity: 1; }
`;

const CheckoutSummaryCard = styled( CheckoutSummaryCardUnstyled )`
	border-bottom: none 0;
`;

const CheckoutSummaryFeatures = styled.div`
	padding: 24px 24px 0;

	@media ( ${ ( props ) => props.theme.breakpoints.desktopUp } ) {
		padding: 24px;
	}
`;

const CheckoutSummaryFeaturesUpsell = styled( CheckoutSummaryFeatures )`
	padding: 12px 24px 0;

	@media ( ${ ( props ) => props.theme.breakpoints.desktopUp } ) {
		padding: 0 24px 24px;
	}

	& svg {
		opacity: 50%;
	}
`;

const CheckoutSummaryFeaturesTitle = styled.h3`
	font-size: 14px;
	font-weight: ${ ( props ) => props.theme.weights.bold };
	margin-bottom: 6px;

	& button {
		font-size: 14px;
		font-weight: ${ ( props ) => props.theme.weights.bold };
		text-decoration: none;
	}
`;

const CheckoutSummaryFeaturesListWrapper = styled.ul`
	margin: 0;
	list-style: none;
	font-size: 14px;
`;

const WPCheckoutCheckIcon = styled( CheckoutCheckIcon )`
	fill: ${ ( props ) => props.theme.colors.success };
	margin-right: 4px;
	position: absolute;
	top: 0;
	left: 0;

	.rtl & {
		margin-right: 0;
		margin-left: 4px;
		right: 0;
		left: auto;
	}
`;

const StyledGridicon = styled( Gridicon )`
	margin-right: 4px;
	position: absolute;
	top: 2px;
	left: 0;

	.rtl & {
		margin-right: 0;
		margin-left: 4px;
		right: 0;
		left: auto;
	}
`;

const WPCheckoutCrossIcon = () => <StyledGridicon icon="cross" size={ 20 } />;

const CheckoutSummaryFeaturesListItem = styled( 'li' )< { isSupported?: boolean } >`
	margin-bottom: 4px;
	padding-left: 24px;
	position: relative;
	overflow-wrap: break-word;
	color: ${ ( props ) => ( props.isSupported ? 'inherit' : 'var( --color-neutral-40 )' ) };

	.rtl & {
		padding-right: 24px;
		padding-left: 0;
	}
`;
CheckoutSummaryFeaturesListItem.defaultProps = {
	isSupported: true,
};

const CheckoutSummaryAmountWrapper = styled.div`
	padding: 24px;

	@media ( ${ ( props ) => props.theme.breakpoints.desktopUp } ) {
		border-top: 1px solid ${ ( props ) => props.theme.colors.borderColorLight };
	}
`;

const CheckoutSummaryLineItem = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-bottom: 4px;

	.is-loading & {
		animation: ${ pulse } 1.5s ease-in-out infinite;
	}
`;

const CheckoutSummaryTotal = styled( CheckoutSummaryLineItem )`
	font-weight: ${ ( props ) => props.theme.weights.bold };
`;

const LoadingCopy = styled.p`
	animation: ${ pulse } 1.5s ease-in-out infinite;
	background: ${ ( props ) => props.theme.colors.borderColorLight };
	border-radius: 2px;
	color: ${ ( props ) => props.theme.colors.borderColorLight };
	content: '';
	font-size: 14px;
	height: 18px;
	margin: 8px 0 0 26px;
	padding: 0;
	position: relative;

	::before {
		content: '';
		display: block;
		position: absolute;
		left: -26px;
		top: 0;
		width: 18px;
		height: 18px;
		background: ${ ( props ) => props.theme.colors.borderColorLight };
		border-radius: 100%;
	}

	.rtl & {
		margin: 8px 26px 0 0;

		::before {
			right: -26px;
			left: auto;
		}
	}
`;

const SwitchToAnnualPlanButton = styled.button`
	text-align: left;
	text-decoration: underline;
	color: var( --color-link );
	cursor: pointer;

	.rtl & {
		text-align: right;
	}

	&:hover {
		text-decoration: none;
	}
`;
