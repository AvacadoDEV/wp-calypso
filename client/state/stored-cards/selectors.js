import { groupBy } from 'lodash';
import { isPaymentAgreement, isCreditCard } from 'calypso/lib/checkout/payment-methods';

import 'calypso/state/stored-cards/init';

/**
 * Return user's stored cards from state object
 *
 * @param {Object} state - current state object
 * @returns {import('calypso/my-sites/checkout/composite-checkout/types/stored-cards.ts').StoredCard[]} Stored Cards
 */
export const getStoredCards = ( state ) =>
	( state.storedCards?.items ?? [] )
		.filter( ( method ) => isCreditCard( method ) )
		.filter( ( method ) => ! method.is_expired )
		.map( ( card ) => ( {
			...card,
			allStoredDetailsIds: [ card.stored_details_id ],
		} ) );

/**
 * Return user's stored cards including expired cards
 *
 * @param {Object} state - current state object
 * @returns {import('calypso/my-sites/checkout/composite-checkout/types/stored-cards.ts').StoredCard[]} Stored Cards
 */
export const getAllStoredCards = ( state ) =>
	( state.storedCards?.items ?? [] )
		.filter( ( method ) => isCreditCard( method ) )
		.map( ( card ) => ( {
			...card,
			allStoredDetailsIds: [ card.stored_details_id ],
		} ) );

/**
 * Return user's stored payment agreements (not cards) from state object
 *
 *
 * @param {Object} state - current state object
 * @returns {Array} Stored Payment Agreements
 */
export const getStoredPaymentAgreements = ( state ) =>
	( state.storedCards?.items ?? [] )
		.filter( ( stored ) => isPaymentAgreement( stored ) )
		.map( ( method ) => ( {
			...method,
			allStoredDetailsIds: [ method.stored_details_id ],
		} ) );

/**
 * Return user's stored payment methods (not cards) from state object that share the same account
 *
 *
 * @param {Object} state - current state object
 * @returns {Array} Stored Payment Methods excluding cards
 */
export const getUniquePaymentAgreements = ( state ) => {
	const paymentMethods = getStoredPaymentAgreements( state );
	const groups = groupBy( paymentMethods, 'email' );
	const paymentMethodsGroups = Object.values( groups );

	const uniquePaymentAgreements = paymentMethodsGroups.map( ( group ) => ( {
		...group[ 0 ],
		allStoredDetailsIds: group.map( ( method ) => method.stored_details_id ),
	} ) );

	return uniquePaymentAgreements;
};

/**
 * Returns a Stored Card
 *
 * @param  {Object} state      global state
 * @param  {number} cardId  the card id
 * @returns {undefined|import('calypso/my-sites/checkout/composite-checkout/types/stored-cards.ts').StoredCard} the matching card if there is one
 */
export const getStoredCardById = ( state, cardId ) =>
	getStoredCards( state )
		.filter( ( card ) => card.stored_details_id === cardId )
		.shift();

export const hasLoadedStoredCardsFromServer = ( state ) =>
	Boolean( state.storedCards?.hasLoadedFromServer );

export const isDeletingStoredCard = ( state, cardId ) =>
	Boolean( state.storedCards?.isDeleting[ cardId ] );

export const isFetchingStoredCards = ( state ) => Boolean( state.storedCards?.isFetching );
