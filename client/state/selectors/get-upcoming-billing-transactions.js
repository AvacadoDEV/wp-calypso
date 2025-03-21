import { get } from 'lodash';
import getBillingTransactions from 'calypso/state/selectors/get-billing-transactions';

import 'calypso/state/billing-transactions/init';

/**
 * Returns all upcoming billing transactions.
 * Returns null if the billing transactions have not been fetched yet.
 *
 * @param  {Object}  state   Global state tree
 * @returns {?Array}          An array of upcoming transactions
 */
export default function getUpcomingBillingTransactions( state ) {
	return get( getBillingTransactions( state ), 'upcoming', null );
}
