import { get } from 'lodash';
import { getCurrentUser } from 'calypso/state/current-user/selectors';

/**
 * Returns whether the current user's primary site's is Jetpack or not.
 *
 * @param  {Object}  state Global state tree
 * @returns {?boolean}     The current user's primary site Jetpack status.
 */
export default function getPrimarySiteIsJetpack( state ) {
	const currentUser = getCurrentUser( state );
	return get( currentUser, 'primary_blog_is_jetpack', null );
}
