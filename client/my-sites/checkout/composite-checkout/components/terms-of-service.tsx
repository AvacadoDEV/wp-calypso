import { localizeUrl } from '@automattic/i18n-utils';
import { useTranslate } from 'i18n-calypso';
import { gaRecordEvent } from 'calypso/lib/analytics/ga';
import TosText from 'calypso/me/purchases/manage-purchase/payment-method-selector/tos-text';
import CheckoutTermsItem from 'calypso/my-sites/checkout/composite-checkout/components/checkout-terms-item';

export const TermsOfService = ( {
	hasRenewableSubscription,
	isGiftPurchase,
}: {
	hasRenewableSubscription: boolean;
	isGiftPurchase: boolean;
} ) => {
	const translate = useTranslate();
	const recordTermsAndConditionsClick = () => {
		gaRecordEvent( 'Upgrades', 'Clicked Terms and Conditions Link' );
	};

	const renderTerms = () => {
		let message = translate( 'You agree to our {{link}}Terms of Service{{/link}}.', {
			components: {
				link: (
					<a
						href={ localizeUrl( 'https://wordpress.com/tos/' ) }
						target="_blank"
						rel="noopener noreferrer"
					/>
				),
			},
		} );

		// Don't show the extended ToS notice for one-time purchases or gifts
		if ( ! isGiftPurchase && hasRenewableSubscription ) {
			message = <TosText />;
		}

		return message;
	};

	return (
		<CheckoutTermsItem onClick={ recordTermsAndConditionsClick }>
			{ renderTerms() }
		</CheckoutTermsItem>
	);
};
