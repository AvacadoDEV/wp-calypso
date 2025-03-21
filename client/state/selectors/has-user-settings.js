import 'calypso/state/user-settings/init';

/**
 * Returns a boolean signifying whether there are settings or not
 *
 *
 * @param {Object} state Global state tree
 * @returns {boolean} true is the user has settings object
 */
export default function hasUserSettings( state ) {
	return !! state.userSettings.settings;
}
