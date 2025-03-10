/**
 * @jest-environment jsdom
 */

import { render, waitFor } from '@testing-library/react';
import { translate } from 'i18n-calypso';
import nock from 'nock';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { siteColumns } from '../../utils';
import SiteTableRow from '../index';
import type { SiteData } from '../../types';

describe( '<SiteTableRow>', () => {
	nock( 'https://public-api.wordpress.com' )
		.persist()
		.get( '/rest/v1.1/jetpack-blogs/1234/test-connection?is_stale_connection_healthy=true' )
		.reply( 200, {
			connected: false,
		} );
	const scanThreats = 4;
	const blogId = 1234;
	const pluginUpdates = [ 'plugin-1', 'plugin-2', 'plugin-3' ];
	const siteObj = {
		blog_id: blogId,
		url: 'test.jurassic.ninja',
		url_with_scheme: 'https://test.jurassic.ninja/',
		monitor_active: false,
		monitor_site_status: false,
		has_scan: true,
		has_backup: false,
		latest_scan_threats_found: [],
		latest_backup_status: '',
		is_connection_healthy: true,
		awaiting_plugin_updates: [],
		is_favorite: false,
	};
	const item: SiteData = {
		site: {
			value: siteObj,
			error: false,
			type: 'site',
			status: '',
		},
		backup: {
			type: 'backup',
			value: translate( 'Failed' ),
			status: 'failed',
		},
		monitor: {
			error: false,
			status: 'failed',
			type: 'monitor',
			value: translate( 'Site Down' ),
		},
		scan: {
			threats: 4,
			type: 'scan',
			status: 'failed',
			value: translate(
				'%(threats)d Threat',
				'%(threats)d Threats', // plural version of the string
				{
					count: scanThreats,
					args: {
						threats: scanThreats,
					},
				}
			),
		},
		plugin: {
			updates: pluginUpdates.length,
			type: 'plugin',
			value: `${ pluginUpdates.length } ${ translate( 'Available' ) }`,
			status: 'warning',
		},
	};
	const props = {
		item,
		columns: siteColumns,
	};
	const initialState = {
		partnerPortal: {
			partner: {
				isPartnerOAuthTokenLoaded: true,
			},
		},
	};
	const mockStore = configureStore();
	const store = mockStore( initialState );
	const queryClient = new QueryClient();

	const { getByText } = render(
		<Provider store={ store }>
			<QueryClientProvider client={ queryClient }>
				<table>
					<tbody>
						<SiteTableRow { ...props } />
					</tbody>
				</table>
			</QueryClientProvider>
		</Provider>
	);

	test( 'should render correctly and have the error message and the link to fix the issue', async () => {
		await waitFor( () => {
			expect( getByText( 'Jetpack is unable to connect to test.jurassic.ninja' ) ).toBeVisible();
			expect( getByText( /fix now/i ) ).toBeVisible();
		} );
	} );
} );
