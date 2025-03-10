import { WPCOM_FEATURES_SCAN } from '@automattic/calypso-products';
import { localize } from 'i18n-calypso';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AdvancedCredentials from 'calypso/components/advanced-credentials';
import DocumentHead from 'calypso/components/data/document-head';
import QueryRewindState from 'calypso/components/data/query-rewind-state';
import QuerySiteFeatures from 'calypso/components/data/query-site-features';
import EmptyContent from 'calypso/components/empty-content';
import FormattedHeader from 'calypso/components/formatted-header';
import Main from 'calypso/components/main';
import JetpackDevModeNotice from 'calypso/my-sites/site-settings/jetpack-dev-mode-notice';
import SiteSettingsNavigation from 'calypso/my-sites/site-settings/navigation';
import getCurrentQueryArguments from 'calypso/state/selectors/get-current-query-arguments';
import isRewindActive from 'calypso/state/selectors/is-rewind-active';
import isSiteFailedMigrationSource from 'calypso/state/selectors/is-site-failed-migration-source';
import siteHasFeature from 'calypso/state/selectors/site-has-feature';
import { isJetpackSite } from 'calypso/state/sites/selectors';
import { getSelectedSite, getSelectedSiteId } from 'calypso/state/ui/selectors';

const SiteSettingsJetpack = ( {
	site,
	siteId,
	siteIsJetpack,
	showCredentials,
	host,
	action,
	translate,
} ) => {
	//todo: this check makes sense in Jetpack section?
	if ( ! siteIsJetpack ) {
		return (
			<EmptyContent
				action={ translate( 'Manage general settings for %(site)s', {
					args: { site: site.name },
				} ) }
				actionURL={ '/settings/general/' + site.slug }
				title={ translate( 'No Jetpack configuration is required.' ) }
				// line={ translate( 'Security management is automatic for WordPress.com sites.' ) }
				illustration="/calypso/images/illustrations/illustration-jetpack.svg"
			/>
		);
	}

	return (
		<Main className="settings-jetpack site-settings">
			<QueryRewindState siteId={ siteId } />
			<QuerySiteFeatures siteIds={ [ siteId ] } />
			<DocumentHead title={ translate( 'Jetpack Settings' ) } />
			<JetpackDevModeNotice />
			<FormattedHeader
				brandFont
				className="settings-jetpack__page-heading"
				headerText={ translate( 'Jetpack Settings' ) }
				align="left"
			/>
			<SiteSettingsNavigation site={ site } section="jetpack" />
			{ showCredentials && <AdvancedCredentials action={ action } host={ host } role="main" /> }
		</Main>
	);
};

SiteSettingsJetpack.propTypes = {
	site: PropTypes.object,
	siteId: PropTypes.number,
	siteIsJetpack: PropTypes.bool,
	showCredentials: PropTypes.bool,
};

export default connect( ( state ) => {
	const site = getSelectedSite( state );
	const siteId = getSelectedSiteId( state );
	const { host, action } = getCurrentQueryArguments( state );

	return {
		site,
		siteId,
		siteIsJetpack: isJetpackSite( state, siteId ),
		showCredentials:
			isSiteFailedMigrationSource( state, siteId ) ||
			isRewindActive( state, siteId ) ||
			siteHasFeature( state, siteId, WPCOM_FEATURES_SCAN ),
		host,
		action,
	};
} )( localize( SiteSettingsJetpack ) );
