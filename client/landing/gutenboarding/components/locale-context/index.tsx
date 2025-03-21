import config from '@automattic/calypso-config';
import { getUrlParts } from '@automattic/calypso-url';
import { LocaleProvider, getLanguageSlugs } from '@automattic/i18n-utils';
import { subscribe, select } from '@wordpress/data';
import { defaultI18n, LocaleData } from '@wordpress/i18n';
import { I18nProvider } from '@wordpress/react-i18n';
import * as React from 'react';
import {
	getLanguageFile,
	getLanguageManifestFile,
	getTranslationChunkFile,
} from '../../../../lib/i18n-utils/switch-locale';
import { recordOnboardingError } from '../../lib/analytics';
import { USER_STORE } from '../../stores/user';
import type { ErrorParameters } from '../../lib/analytics/types';
import type { User } from '@automattic/data-stores';
import type { LanguageSlug } from '@automattic/languages';

const DEFAULT_LOCALE_SLUG: string = config( 'i18n_default_locale_slug' );
const USE_TRANSLATION_CHUNKS: boolean =
	config.isEnabled( 'use-translation-chunks' ) ||
	getUrlParts( document.location.href ).searchParams.has( 'useTranslationChunks' );

interface AppWindow extends Window {
	currentUser?: User.CurrentUser;
	BUILD_TARGET?: string;
	installedChunks?: string[];
	i18nLocaleStrings?: string;
	__requireChunkCallback__?: {
		add( callback: Function ): void; // eslint-disable-line @typescript-eslint/ban-types
		getInstalledChunks(): string[];
	};
	updateLocale: ( newLocale: string ) => Promise< void >; // fixme: this is just for demonstration purposes
}

declare const window: AppWindow;

export type ChangeLocaleFunction = ( newLocale: string ) => void;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ChangeLocaleContext = React.createContext< ChangeLocaleFunction >( () => {} );

export const ChangeLocaleContextConsumer = ChangeLocaleContext.Consumer;

export const LocaleContext: React.FunctionComponent = ( { children } ) => {
	const [ contextLocaleData, setContextLocaleData ] = React.useState< LocaleData | undefined >();
	const [ localeDataLoaded, setLocaleDataLoaded ] = React.useState( false );
	const localeSlug = contextLocaleData?.[ '' ]?.localeSlug ?? DEFAULT_LOCALE_SLUG;

	const setLocale = ( newLocaleData: LocaleData | undefined ) => {
		defaultI18n.resetLocaleData( newLocaleData );
		setContextLocaleData( newLocaleData );
		setLocaleDataLoaded( true );
	};

	const changeLocale = async ( newLocale: string ) => {
		if ( newLocale === DEFAULT_LOCALE_SLUG ) {
			setLocale( undefined );
		}
		try {
			const { translatedChunks, ...localeData } = await getLocaleData( newLocale );

			if ( USE_TRANSLATION_CHUNKS ) {
				const chunkedLocaleData = await setupTranslationChunks( newLocale, translatedChunks );
				setLocale( { ...chunkedLocaleData, ...localeData } );
			} else {
				setLocale( localeData );
			}
		} catch ( error ) {
			recordOnboardingError( error as ErrorParameters );
			setLocale( undefined );
		}
	};

	const loadInitalLocale = async () => {
		// trigger changeLocale once to load the initial locale
		const userLocale = await getLocale();
		changeLocale( userLocale );
	};

	React.useEffect( () => {
		loadInitalLocale();
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<ChangeLocaleContext.Provider value={ changeLocale }>
			<LocaleProvider localeSlug={ localeSlug }>
				<I18nProvider i18n={ defaultI18n }>{ localeDataLoaded ? children : null }</I18nProvider>
			</LocaleProvider>
		</ChangeLocaleContext.Provider>
	);
};

function waitForCurrentUser(): Promise< User.CurrentUser | undefined > {
	let unsubscribe: () => void = () => undefined;
	return new Promise< User.CurrentUser | undefined >( ( resolve ) => {
		unsubscribe = subscribe( () => {
			const currentUser = select( USER_STORE ).getCurrentUser();
			if ( currentUser ) {
				resolve( currentUser );
			}
			if ( ! select( 'core/data' ).isResolving( USER_STORE, 'getCurrentUser' ) ) {
				resolve( undefined );
			}
		} );
		select( USER_STORE ).getCurrentUser();
	} ).finally( unsubscribe );
}

async function setupTranslationChunks( localeSlug: string, translatedChunks: string[] = [] ) {
	if ( ! window.__requireChunkCallback__ ) {
		return;
	}

	interface TranslationChunksCache {
		[ propName: string ]: undefined | boolean;
	}
	const loadedTranslationChunks: TranslationChunksCache = {};
	const loadTranslationForChunkIfNeeded = async ( chunkId: string ) => {
		if ( ! translatedChunks.includes( chunkId ) || loadedTranslationChunks[ chunkId ] ) {
			return;
		}

		return getTranslationChunkFile( chunkId, localeSlug ).then( ( translations ) => {
			loadedTranslationChunks[ chunkId ] = true;
			return translations;
		} );
	};

	const installedChunks = new Set(
		( window.installedChunks || [] ).concat( window.__requireChunkCallback__.getInstalledChunks() )
	);

	const localeData = await Promise.all(
		[ ...installedChunks ].map( ( chunkId: string ) => loadTranslationForChunkIfNeeded( chunkId ) )
	).then( ( values ) =>
		values.reduce( ( localeDataObj, chunk ) => Object.assign( {}, localeDataObj, chunk ) )
	);

	return localeData;
}

/**
 * Load the user's locale
 *
 * 1. If there's an explicit locale slug, use that locale.
 * 2. If i18nLocalStrings is present use that locale.
 * 3. If we have a currentUser object, use that locale.
 * 4. Fetch the current user and use language
 * 5. TODO (#39312): If we have a URL locale slug, fetch and use data.
 * 6. Fallback to "en" locale without data.
 *
 * @returns locale slug
 */
async function getLocale(): Promise< string > {
	// Explicit locale slug.
	const pathname = new URL( window.location.href ).pathname;
	const lastPathSegment = pathname.substr( pathname.lastIndexOf( '/' ) + 1 ) as LanguageSlug;
	if ( getLanguageSlugs().includes( lastPathSegment ) ) {
		return lastPathSegment;
	}

	// Bootstraped locale
	if ( window.i18nLocaleStrings ) {
		const bootstrappedLocaleData = JSON.parse( window.i18nLocaleStrings );
		return bootstrappedLocaleData[ '' ].localeSlug;
	}

	// User without bootstrapped locale
	const user = window.currentUser || ( await waitForCurrentUser() );

	if ( ! user ) {
		return DEFAULT_LOCALE_SLUG;
	}

	return getLocaleFromUser( user );
}

async function getLocaleData( locale: string ) {
	if ( locale === DEFAULT_LOCALE_SLUG ) {
		return {};
	}

	if ( USE_TRANSLATION_CHUNKS ) {
		const manifest = await getLanguageManifestFile( locale );
		const localeData = {
			...manifest.locale,
			translatedChunks: manifest.translatedChunks,
		};
		return localeData;
	}

	return getLanguageFile( locale );
}

function getLocaleFromUser( user: User.CurrentUser ): string {
	return user.locale_variant || user.localeVariant || user.language || user.localeSlug;
}
