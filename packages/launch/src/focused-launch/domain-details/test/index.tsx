import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import DomainStep from '../';

jest.mock( '@automattic/calypso-config', () => ( {
	isEnabled: () => false,
	__esModule: true,
	default: function config( key: string ) {
		return key;
	},
} ) );

describe( 'DomainStep', () => {
	test( 'Has title and sub-title', () => {
		render(
			<Router>
				<DomainStep />
			</Router>
		);

		expect( screen.queryByText( /Choose a domain/i ) ).toBeTruthy();
		expect(
			screen.queryByText( /Free for the first year with any (paid|annual) plan/i )
		).toBeTruthy();
	} );

	test( 'Has domain search input', () => {
		render(
			<Router>
				<DomainStep />
			</Router>
		);

		expect( screen.queryByPlaceholderText( /Search for a domain/i ) ).toBeTruthy();
	} );

	test( 'Has a back button', () => {
		render(
			<Router>
				<DomainStep />
			</Router>
		);

		expect( screen.queryByText( /Go back/i ) ).toBeTruthy();
	} );
} );
