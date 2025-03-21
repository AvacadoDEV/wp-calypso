import { translate, useTranslate } from 'i18n-calypso';
import { createElement, useMemo } from 'react';
import {
	PRODUCT_JETPACK_ANTI_SPAM,
	PRODUCT_JETPACK_ANTI_SPAM_MONTHLY,
	PRODUCT_JETPACK_BACKUP_DAILY,
	PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY,
	PRODUCT_JETPACK_BACKUP_REALTIME,
	PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY,
	PRODUCT_JETPACK_BACKUP_T1_YEARLY,
	PRODUCT_JETPACK_BACKUP_T1_MONTHLY,
	PRODUCT_JETPACK_BACKUP_T2_YEARLY,
	PRODUCT_JETPACK_BACKUP_T2_MONTHLY,
	PRODUCT_JETPACK_SCAN,
	PRODUCT_JETPACK_SCAN_MONTHLY,
	PRODUCT_JETPACK_SCAN_REALTIME,
	PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY,
	PRODUCT_JETPACK_SEARCH,
	PRODUCT_JETPACK_SEARCH_MONTHLY,
	PRODUCT_JETPACK_VIDEOPRESS,
	PRODUCT_JETPACK_VIDEOPRESS_MONTHLY,
	PLAN_JETPACK_SECURITY_T1_YEARLY,
	PLAN_JETPACK_SECURITY_T1_MONTHLY,
	PLAN_JETPACK_SECURITY_T2_YEARLY,
	PLAN_JETPACK_SECURITY_T2_MONTHLY,
	PRODUCT_WPCOM_SEARCH,
	PRODUCT_JETPACK_SEARCH_FREE,
	PRODUCT_WPCOM_SEARCH_MONTHLY,
	PRODUCT_JETPACK_BOOST,
	PRODUCT_JETPACK_BOOST_MONTHLY,
	PRODUCT_JETPACK_SOCIAL_BASIC,
	PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY,
	PRODUCT_JETPACK_SOCIAL_ADVANCED,
	PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY,
	JETPACK_TAG_FOR_VIDEOGRAPHERS,
	JETPACK_TAG_FOR_ALL_SITES,
	JETPACK_TAG_FOR_BLOGGERS,
	JETPACK_TAG_FOR_BLOGS,
	JETPACK_TAG_FOR_EDUCATORS,
	JETPACK_TAG_FOR_MEMBERSHIP_SITES,
	JETPACK_TAG_FOR_NEWS_ORGANISATIONS,
	JETPACK_TAG_FOR_ONLINE_FORUMS,
	JETPACK_TAG_FOR_WOOCOMMERCE_STORES,
	PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_MONTHLY,
	PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_MONTHLY,
	PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_MONTHLY,
	PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_YEARLY,
	PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_YEARLY,
	PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_YEARLY,
} from './constants';
import type { SelectorProductFeaturesItem } from './types';
import type { TranslateResult } from 'i18n-calypso';

// Translatable strings
export const getJetpackProductsShortNames = (): Record< string, TranslateResult > => {
	return {
		[ PRODUCT_JETPACK_BACKUP_DAILY ]: translate( 'VaultPress Backup {{em}}Daily{{/em}}', {
			components: {
				em: createElement( 'em' ),
			},
		} ),
		[ PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY ]: translate( 'VaultPress Backup {{em}}Daily{{/em}}', {
			components: {
				em: createElement( 'em' ),
			},
		} ),
		[ PRODUCT_JETPACK_BACKUP_REALTIME ]: translate( 'VaultPress Backup {{em}}Real-time{{/em}}', {
			components: {
				em: createElement( 'em', { style: { whiteSpace: 'nowrap' } } ),
			},
		} ),
		[ PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY ]: translate(
			'VaultPress Backup {{em}}Real-time{{/em}}',
			{
				components: {
					em: createElement( 'em', { style: { whiteSpace: 'nowrap' } } ),
				},
			}
		),
		[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: translate( 'VaultPress Backup' ),
		[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: translate( 'VaultPress Backup' ),
		[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: translate( 'VaultPress Backup' ),
		[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: translate( 'VaultPress Backup' ),
		[ PRODUCT_JETPACK_BOOST ]: translate( 'Boost' ),
		[ PRODUCT_JETPACK_BOOST_MONTHLY ]: translate( 'Boost' ),
		[ PRODUCT_JETPACK_SCAN_REALTIME ]: translate( 'Scan {{em}}Real-time{{/em}}', {
			components: {
				em: createElement( 'em', { style: { whiteSpace: 'nowrap' } } ),
			},
		} ),
		[ PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY ]: translate( 'Scan {{em}}Real-time{{/em}}', {
			components: {
				em: createElement( 'em', { style: { whiteSpace: 'nowrap' } } ),
			},
		} ),
		[ PRODUCT_JETPACK_SCAN ]: translate( 'Scan' ),
		[ PRODUCT_JETPACK_SCAN_MONTHLY ]: translate( 'Scan' ),
		[ PRODUCT_JETPACK_SEARCH ]: translate( 'Search' ),
		[ PRODUCT_JETPACK_SEARCH_FREE ]: translate( 'Search' ),
		[ PRODUCT_JETPACK_SEARCH_MONTHLY ]: translate( 'Search' ),
		[ PRODUCT_WPCOM_SEARCH ]: translate( 'Search' ),
		[ PRODUCT_WPCOM_SEARCH_MONTHLY ]: translate( 'Search' ),
		[ PRODUCT_JETPACK_ANTI_SPAM ]: translate( 'Akismet {{s}}Anti-spam{{/s}}', {
			components: {
				s: <span style={ { whiteSpace: 'nowrap' } } />,
			},
		} ),
		[ PRODUCT_JETPACK_ANTI_SPAM_MONTHLY ]: translate( 'Akismet {{s}}Anti-spam{{/s}}', {
			components: {
				s: <span style={ { whiteSpace: 'nowrap' } } />,
			},
		} ),
		[ PRODUCT_JETPACK_VIDEOPRESS ]: translate( 'VideoPress' ),
		[ PRODUCT_JETPACK_VIDEOPRESS_MONTHLY ]: translate( 'VideoPress' ),
		[ PRODUCT_JETPACK_SOCIAL_BASIC ]: translate( 'Social', { context: 'Jetpack product name' } ),
		[ PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY ]: translate( 'Social', {
			context: 'Jetpack product name',
		} ),
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED ]: translate( 'Social', { context: 'Jetpack product name' } ),
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY ]: translate( 'Social', {
			context: 'Jetpack product name',
		} ),
	};
};

export const getJetpackProductsDisplayNames = (): Record< string, TranslateResult > => {
	const backupDaily = translate( 'VaultPress Backup {{em}}Daily{{/em}}', {
		components: {
			em: <em />,
		},
	} );
	const backupRealtime = (
		<>
			{ translate( 'VaultPress Backup {{em}}Real-time{{/em}}', {
				components: {
					em: <em style={ { whiteSpace: 'nowrap' } } />,
				},
			} ) }
		</>
	);
	const backupT1 = translate( 'VaultPress Backup' );
	const backupT2 = translate( 'VaultPress Backup' );
	const search = translate( 'Site Search' );
	const scan = translate( 'Scan' );
	const scanRealtime = (
		<>
			{ translate( 'Scan {{em}}Real-time{{/em}}', {
				components: {
					em: <em style={ { whiteSpace: 'nowrap' } } />,
				},
			} ) }
		</>
	);
	const videoPress = translate( 'VideoPress' );
	const antiSpam = translate( 'Akismet {{s}}Anti-spam{{/s}}', {
		components: {
			s: <span style={ { whiteSpace: 'nowrap' } } />,
		},
	} );
	const boost = translate( 'Boost' );
	const socialBasic = translate( 'Social Basic', { context: 'Jetpack product name' } );
	const socialAdvanced = translate( 'Social Advanced Beta', { context: 'Jetpack product name' } );

	const text10gb = translate( '%(numberOfGigabytes)dGB', '%(numberOfGigabytes)dGB', {
		comment:
			'Displays an amount of gigabytes. Plural string used in case GB needs to be pluralized.',
		count: 10,
		args: { numberOfGigabytes: 10 },
	} );

	const text100gb = translate( '%(numberOfGigabytes)dGB', '%(numberOfGigabytes)dGB', {
		comment:
			'Displays an amount of gigabytes. Plural string used in case GB needs to be pluralized.',
		count: 100,
		args: { numberOfGigabytes: 100 },
	} );

	const text1tb = translate( '%(numberOfTerabytes)dTB', '%(numberOfTerabytes)dTB', {
		comment:
			'Displays an amount of terabytes. Plural string used in case TB needs to be pluralized.',
		count: 1,
		args: { numberOfTerabytes: 1 },
	} );

	//Backup Add-on products
	const backupAddon10gb = translate( 'VaultPress Backup Add-on Storage (%(storageAmount)s)', {
		args: { storageAmount: text10gb },
	} );
	const backupAddon100gb = translate( 'VaultPress Backup Add-on Storage (%(storageAmount)s)', {
		args: { storageAmount: text100gb },
	} );
	const backupAddon1tb = translate( 'VaultPress Backup Add-on Storage (%(storageAmount)s)', {
		args: { storageAmount: text1tb },
	} );

	return {
		[ PRODUCT_JETPACK_BACKUP_DAILY ]: backupDaily,
		[ PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY ]: backupDaily,
		[ PRODUCT_JETPACK_BACKUP_REALTIME ]: backupRealtime,
		[ PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY ]: backupRealtime,
		[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: backupT1,
		[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: backupT1,
		[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: backupT2,
		[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: backupT2,
		[ PRODUCT_JETPACK_BOOST ]: boost,
		[ PRODUCT_JETPACK_BOOST_MONTHLY ]: boost,
		[ PRODUCT_JETPACK_SEARCH ]: search,
		[ PRODUCT_JETPACK_SEARCH_MONTHLY ]: search,
		[ PRODUCT_WPCOM_SEARCH ]: search,
		[ PRODUCT_WPCOM_SEARCH_MONTHLY ]: search,
		[ PRODUCT_JETPACK_SCAN ]: scan,
		[ PRODUCT_JETPACK_SCAN_MONTHLY ]: scan,
		[ PRODUCT_JETPACK_SCAN_REALTIME ]: scanRealtime,
		[ PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY ]: scanRealtime,
		[ PRODUCT_JETPACK_VIDEOPRESS ]: videoPress,
		[ PRODUCT_JETPACK_VIDEOPRESS_MONTHLY ]: videoPress,
		[ PRODUCT_JETPACK_ANTI_SPAM ]: antiSpam,
		[ PRODUCT_JETPACK_ANTI_SPAM_MONTHLY ]: antiSpam,
		[ PRODUCT_JETPACK_SOCIAL_BASIC ]: socialBasic,
		[ PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY ]: socialBasic,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED ]: socialAdvanced,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY ]: socialAdvanced,
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_MONTHLY ]: backupAddon10gb,
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_MONTHLY ]: backupAddon100gb,
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_MONTHLY ]: backupAddon1tb,
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_YEARLY ]: backupAddon10gb,
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_YEARLY ]: backupAddon100gb,
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_YEARLY ]: backupAddon1tb,
	};
};

export const getJetpackProductsCallToAction = (): Record< string, TranslateResult > => {
	const backupDaily = translate( 'Get VaultPress Backup {{em}}Daily{{/em}}', {
		components: {
			em: <em />,
		},
	} );
	const backupRealtime = (
		<>
			{ translate( 'Get VaultPress Backup {{em}}Real-time{{/em}}', {
				components: {
					em: <em style={ { whiteSpace: 'nowrap' } } />,
				},
			} ) }
		</>
	);
	const backupT1 = translate( 'Get VaultPress Backup' );
	const backupT2 = translate( 'Get VaultPress Backup' );
	const search = translate( 'Get Site Search' );
	const scan = translate( 'Get Scan' );
	const videoPress = translate( 'Get VideoPress' );
	const antiSpam = translate( 'Get Akismet {{s}}Anti-spam{{/s}}', {
		components: {
			s: <span style={ { whiteSpace: 'nowrap' } } />,
		},
	} );
	const boost = translate( 'Get Boost' );
	const social = translate( 'Get Social' );

	return {
		[ PRODUCT_JETPACK_BACKUP_DAILY ]: backupDaily,
		[ PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY ]: backupDaily,
		[ PRODUCT_JETPACK_BACKUP_REALTIME ]: backupRealtime,
		[ PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY ]: backupRealtime,
		[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: backupT1,
		[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: backupT1,
		[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: backupT2,
		[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: backupT2,
		[ PRODUCT_JETPACK_BOOST ]: boost,
		[ PRODUCT_JETPACK_BOOST_MONTHLY ]: boost,
		[ PRODUCT_JETPACK_SEARCH ]: search,
		[ PRODUCT_JETPACK_SEARCH_MONTHLY ]: search,
		[ PRODUCT_JETPACK_SCAN ]: scan,
		[ PRODUCT_JETPACK_SCAN_MONTHLY ]: scan,
		[ PRODUCT_JETPACK_VIDEOPRESS ]: videoPress,
		[ PRODUCT_JETPACK_VIDEOPRESS_MONTHLY ]: videoPress,
		[ PRODUCT_JETPACK_ANTI_SPAM ]: antiSpam,
		[ PRODUCT_JETPACK_ANTI_SPAM_MONTHLY ]: antiSpam,
		[ PRODUCT_JETPACK_SOCIAL_BASIC ]: social,
		[ PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY ]: social,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED ]: social,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY ]: social,
	};
};

export const getJetpackProductsTaglines = (): Record<
	string,
	{ default: TranslateResult; owned?: TranslateResult }
> => {
	const backupDailyTagline = translate( 'Best for sites with occasional updates' );
	const backupRealtimeTagline = translate( 'Best for sites with frequent updates' );
	const backupOwnedTagline = translate( 'Your site is actively being backed up' );
	const boostTagLine = translate( "Improve your site's performance" );
	const boostOwnedTagLine = translate( 'Your site is optimized with Boost' );
	const searchTagline = translate( 'Recommended for sites with lots of products or content' );
	const scanTagline = translate( 'Protect your site' );
	const scanOwnedTagline = translate( 'Your site is actively being scanned for malicious threats' );
	const antiSpamTagline = translate( 'Block spam automatically' );
	const videoPressTagLine = translate( 'High-quality, ad-free video for WordPress' );
	const socialTagLine = translate(
		'Easily share your website content on your social media channels'
	);
	//TODO: fill in the actua value.
	const socialAdvancedTagLine = translate(
		'Easily share your website content on your social media channels'
	);
	const backupAddonTagLine = translate(
		'Additional storage for your Jetpack VaultPress Backup plan.'
	);
	const backupAddonOwnedTagLine = translate(
		'Your site has additional storage for Jetpack VaultPress Backup.'
	);
	return {
		[ PRODUCT_JETPACK_BACKUP_DAILY ]: {
			default: backupDailyTagline,
			owned: backupOwnedTagline,
		},
		[ PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY ]: {
			default: backupDailyTagline,
			owned: backupOwnedTagline,
		},
		[ PRODUCT_JETPACK_BACKUP_REALTIME ]: {
			default: backupRealtimeTagline,
			owned: backupOwnedTagline,
		},
		[ PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY ]: {
			default: backupRealtimeTagline,
			owned: backupOwnedTagline,
		},
		// TODO: get taglines specifically for the new Jetpack Backup products
		[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: {
			default: backupRealtimeTagline,
			owned: backupOwnedTagline,
		},
		[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: {
			default: backupRealtimeTagline,
			owned: backupOwnedTagline,
		},
		[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: {
			default: backupRealtimeTagline,
			owned: backupOwnedTagline,
		},
		[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: {
			default: backupRealtimeTagline,
			owned: backupOwnedTagline,
		},
		[ PRODUCT_JETPACK_BOOST ]: {
			default: boostTagLine,
			owned: boostOwnedTagLine,
		},
		[ PRODUCT_JETPACK_BOOST_MONTHLY ]: {
			default: boostTagLine,
			owned: boostOwnedTagLine,
		},
		[ PRODUCT_JETPACK_SEARCH ]: { default: searchTagline },
		[ PRODUCT_JETPACK_SEARCH_MONTHLY ]: { default: searchTagline },
		[ PRODUCT_WPCOM_SEARCH ]: { default: searchTagline },
		[ PRODUCT_WPCOM_SEARCH_MONTHLY ]: { default: searchTagline },
		[ PRODUCT_JETPACK_SCAN ]: {
			default: scanTagline,
			owned: scanOwnedTagline,
		},
		[ PRODUCT_JETPACK_SCAN_MONTHLY ]: {
			default: scanTagline,
			owned: scanOwnedTagline,
		},
		[ PRODUCT_JETPACK_ANTI_SPAM ]: { default: antiSpamTagline },
		[ PRODUCT_JETPACK_ANTI_SPAM_MONTHLY ]: { default: antiSpamTagline },
		[ PRODUCT_JETPACK_VIDEOPRESS ]: { default: videoPressTagLine },
		[ PRODUCT_JETPACK_VIDEOPRESS_MONTHLY ]: { default: videoPressTagLine },
		[ PRODUCT_JETPACK_SOCIAL_BASIC ]: { default: socialTagLine },
		[ PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY ]: { default: socialTagLine },
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED ]: { default: socialAdvancedTagLine },
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY ]: { default: socialAdvancedTagLine },
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_MONTHLY ]: {
			default: backupAddonTagLine,
			owned: backupAddonOwnedTagLine,
		},
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_MONTHLY ]: {
			default: backupAddonTagLine,
			owned: backupAddonOwnedTagLine,
		},
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_MONTHLY ]: {
			default: backupAddonTagLine,
			owned: backupAddonOwnedTagLine,
		},
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_10GB_YEARLY ]: {
			default: backupAddonTagLine,
			owned: backupAddonOwnedTagLine,
		},
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_100GB_YEARLY ]: {
			default: backupAddonTagLine,
			owned: backupAddonOwnedTagLine,
		},
		[ PRODUCT_JETPACK_BACKUP_ADDON_STORAGE_1TB_YEARLY ]: {
			default: backupAddonTagLine,
			owned: backupAddonOwnedTagLine,
		},
	};
};

export const getJetpackProductDisclaimers = (
	features: SelectorProductFeaturesItem[],
	link: string
): Record< string, TranslateResult > => {
	const backupDisclaimerFeatureSlugs = [
		'jetpack-1-year-archive-activity-log',
		'jetpack-30-day-archive-activity-log',
	];

	const featureSlugs = features.map( ( feature ) => feature.slug );

	/* Checks if any slugs of featues on the current Product match a set of slugs provided to this function. This determines whether or not to show the disclaimer based on whether the features the disclaimer is for is present */
	const doesProductHaveCompatibleSlug = ( slugsToCheckFor: string[] ) => {
		const combinedFeatureSlugs = featureSlugs.concat( slugsToCheckFor );

		return new Set( combinedFeatureSlugs ).size !== combinedFeatureSlugs.length;
	};

	const getLink = () => {
		if ( link[ 0 ] === '#' ) {
			return <a href={ link }></a>;
		}

		return <a href={ link } target="_blank" rel="noreferrer"></a>;
	};

	const backupT1Disclaimer = doesProductHaveCompatibleSlug( backupDisclaimerFeatureSlugs ) ? (
		translate( '* Subject to your usage and storage limit. {{link}}Learn more{{/link}}.', {
			components: {
				link: getLink(),
			},
		} )
	) : (
		<></>
	);
	const backupT2Disclaimer = doesProductHaveCompatibleSlug( backupDisclaimerFeatureSlugs ) ? (
		translate( '* Subject to your usage and storage limit. {{link}}Learn more{{/link}}.', {
			components: {
				link: getLink(),
			},
		} )
	) : (
		<></>
	);

	return {
		[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: backupT1Disclaimer,
		[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: backupT1Disclaimer,
		[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: backupT2Disclaimer,
		[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: backupT2Disclaimer,
		[ PLAN_JETPACK_SECURITY_T1_YEARLY ]: backupT1Disclaimer,
		[ PLAN_JETPACK_SECURITY_T1_MONTHLY ]: backupT1Disclaimer,
		[ PLAN_JETPACK_SECURITY_T2_YEARLY ]: backupT2Disclaimer,
		[ PLAN_JETPACK_SECURITY_T2_MONTHLY ]: backupT2Disclaimer,
	};
};

export const getJetpackProductsDescriptions = (): Record< string, TranslateResult > => {
	const backupDailyDescription = translate(
		'Never lose a word, image, page, or time worrying about your site with automated backups & one-click restores.'
	);
	const backupRealtimeDescription = translate(
		'Real-time backups save every change and one-click restores get you back online quickly.'
	);
	const backupT1Description = translate(
		'Save every change with real-time backups and get back online quickly with one-click restores.'
	);
	const backupT2Description = translate(
		'Save every change with real-time backups and get back online quickly with one-click restores.'
	);
	const boostDescription = translate(
		"One-click optimizations that supercharge your WordPress site's performance and improve web vitals scores for better SEO."
	);
	const searchDescription = translate(
		'Help your site visitors find answers instantly so they keep reading and buying. Great for sites with a lot of content.'
	);

	const scanDescription = translate(
		'Automatic scanning and one-click fixes keep your site one step ahead of security threats and malware.'
	);

	const videoPressDescription = translate(
		'High-quality, ad-free video built specifically for WordPress.'
	);

	const antiSpamDescription = translate(
		'Save time and get better responses by automatically blocking spam from your comments and forms.'
	);

	const socialDescription = translate(
		'Easily share your website content on your social media channels from one place.'
	);

	//TODO: fill in the right value.
	const socialAdvancedDescription = translate(
		'Easily share your website content on your social media channels from one place.'
	);

	return {
		[ PRODUCT_JETPACK_BACKUP_DAILY ]: backupDailyDescription,
		[ PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY ]: backupDailyDescription,
		[ PRODUCT_JETPACK_BACKUP_REALTIME ]: backupRealtimeDescription,
		[ PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY ]: backupRealtimeDescription,
		[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: backupT1Description,
		[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: backupT1Description,
		[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: backupT2Description,
		[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: backupT2Description,
		[ PRODUCT_JETPACK_BOOST ]: boostDescription,
		[ PRODUCT_JETPACK_BOOST_MONTHLY ]: boostDescription,
		[ PRODUCT_JETPACK_SEARCH ]: searchDescription,
		[ PRODUCT_JETPACK_SEARCH_MONTHLY ]: searchDescription,
		[ PRODUCT_JETPACK_SCAN ]: scanDescription,
		[ PRODUCT_JETPACK_SCAN_MONTHLY ]: scanDescription,
		[ PRODUCT_JETPACK_SCAN_REALTIME ]: scanDescription,
		[ PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY ]: scanDescription,
		[ PRODUCT_JETPACK_VIDEOPRESS ]: videoPressDescription,
		[ PRODUCT_JETPACK_VIDEOPRESS_MONTHLY ]: videoPressDescription,
		[ PRODUCT_JETPACK_ANTI_SPAM ]: antiSpamDescription,
		[ PRODUCT_JETPACK_ANTI_SPAM_MONTHLY ]: antiSpamDescription,
		[ PRODUCT_JETPACK_SOCIAL_BASIC ]: socialDescription,
		[ PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY ]: socialDescription,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED ]: socialAdvancedDescription,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY ]: socialAdvancedDescription,
	};
};

export const getJetpackProductsShortDescriptions = (): Record< string, TranslateResult > => {
	const backupDailyShortDescription = translate(
		'Automated daily backups with one-click restores.'
	);
	const backupRealtimeShortDescription = translate(
		'Real-time cloud backups with one-click restores.'
	);
	const backupT1ShortDescription = translate( 'Real-time cloud backups with one-click restores.' );
	const backupT2ShortDescription = translate( 'Real-time cloud backups with one-click restores.' );
	const boostShortDescription = translate(
		'Speed up your site and improve SEO - no developer required.'
	);
	const searchShortDescription = translate( 'Help your site visitors find answers instantly.' );
	const scanShortDescription = translate( 'Automatic malware scanning with one-click fixes.' );
	const videoPressShortDescription = translate(
		'High-quality, ad-free video built specifically for WordPress.'
	);
	const antiSpamShortDescription = translate(
		'Automatically clear spam from your comments and forms.'
	);
	const socialShortDescription = translate( 'Write once, post everywhere.' );
	//TODO: Fill in the right value.
	const socialAdvancedShortDescription = translate( 'Write once, post everywhere.' );

	return {
		[ PRODUCT_JETPACK_BACKUP_DAILY ]: backupDailyShortDescription,
		[ PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY ]: backupDailyShortDescription,
		[ PRODUCT_JETPACK_BACKUP_REALTIME ]: backupRealtimeShortDescription,
		[ PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY ]: backupRealtimeShortDescription,
		[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: backupT1ShortDescription,
		[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: backupT1ShortDescription,
		[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: backupT2ShortDescription,
		[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: backupT2ShortDescription,
		[ PRODUCT_JETPACK_BOOST ]: boostShortDescription,
		[ PRODUCT_JETPACK_BOOST_MONTHLY ]: boostShortDescription,
		[ PRODUCT_JETPACK_SEARCH ]: searchShortDescription,
		[ PRODUCT_JETPACK_SEARCH_MONTHLY ]: searchShortDescription,
		[ PRODUCT_JETPACK_SCAN ]: scanShortDescription,
		[ PRODUCT_JETPACK_SCAN_MONTHLY ]: scanShortDescription,
		[ PRODUCT_JETPACK_SCAN_REALTIME ]: scanShortDescription,
		[ PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY ]: scanShortDescription,
		[ PRODUCT_JETPACK_VIDEOPRESS ]: videoPressShortDescription,
		[ PRODUCT_JETPACK_VIDEOPRESS_MONTHLY ]: videoPressShortDescription,
		[ PRODUCT_JETPACK_ANTI_SPAM ]: antiSpamShortDescription,
		[ PRODUCT_JETPACK_ANTI_SPAM_MONTHLY ]: antiSpamShortDescription,
		[ PRODUCT_JETPACK_SOCIAL_BASIC ]: socialShortDescription,
		[ PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY ]: socialShortDescription,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED ]: socialAdvancedShortDescription,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY ]: socialAdvancedShortDescription,
	};
};

export const getJetpackProductsFeaturedDescription = (): Record< string, TranslateResult > => {
	const backupDailyFeaturedText = translate(
		'Never lose a word, image, page, or time worrying about your site with automated daily backups & one-click restores.'
	);
	const backupFeaturedText = translate(
		'Protect your site or store. Save every change with real-time cloud backups, and restore in one click.'
	);
	const videoPressFeaturedText = translate(
		'Own your content. High-quality, ad-free video built specifically for WordPress.'
	);
	const antiSpamFeaturedText = translate(
		'Stop spam in comments and forms. Save time through automation and get rid of annoying CAPTCHAs.'
	);
	const scanFeaturedText = translate(
		'Stay ahead of security threats. Automatic scanning and one-click fixes give you and your customers peace of mind.'
	);
	const searchFeaturedText = translate(
		'Instant search helps your visitors actually find what they need and improves conversion.'
	);
	const boostFeaturedText = translate(
		'Instant speed and SEO boost. Get the same advantages as the top sites, no developer required.'
	);
	const socialFeaturedText = translate(
		'Write once, post everywhere. Easily share your content on social media from WordPress.'
	);
	//TODO: fill in the right value.
	const socialAdvancedFeaturedText = translate(
		'Write once, post everywhere. Easily share your content on social media from WordPress.'
	);

	return {
		[ PRODUCT_JETPACK_BACKUP_DAILY ]: backupDailyFeaturedText,
		[ PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY ]: backupDailyFeaturedText,
		[ PRODUCT_JETPACK_BACKUP_REALTIME ]: backupFeaturedText,
		[ PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY ]: backupFeaturedText,
		[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: backupFeaturedText,
		[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: backupFeaturedText,
		[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: backupFeaturedText,
		[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: backupFeaturedText,
		[ PRODUCT_JETPACK_VIDEOPRESS ]: videoPressFeaturedText,
		[ PRODUCT_JETPACK_VIDEOPRESS_MONTHLY ]: videoPressFeaturedText,
		[ PRODUCT_JETPACK_ANTI_SPAM ]: antiSpamFeaturedText,
		[ PRODUCT_JETPACK_ANTI_SPAM_MONTHLY ]: antiSpamFeaturedText,
		[ PRODUCT_JETPACK_SCAN ]: scanFeaturedText,
		[ PRODUCT_JETPACK_SCAN_MONTHLY ]: scanFeaturedText,
		[ PRODUCT_JETPACK_SCAN_REALTIME ]: scanFeaturedText,
		[ PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY ]: scanFeaturedText,
		[ PRODUCT_JETPACK_SEARCH ]: searchFeaturedText,
		[ PRODUCT_JETPACK_SEARCH_MONTHLY ]: searchFeaturedText,
		[ PRODUCT_JETPACK_BOOST ]: boostFeaturedText,
		[ PRODUCT_JETPACK_BOOST_MONTHLY ]: boostFeaturedText,
		[ PRODUCT_JETPACK_SOCIAL_BASIC ]: socialFeaturedText,
		[ PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY ]: socialFeaturedText,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED ]: socialAdvancedFeaturedText,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY ]: socialAdvancedFeaturedText,
	};
};
export const getJetpackProductsLightboxDescription = (): Record< string, TranslateResult > => {
	const backupDailyLightboxDescription = translate(
		'Protect your site or store with automated daily cloud backups, and restore in one click from anywhere.'
	);
	const backupLightboxDescription = translate(
		'Protect your site or store. Save every change with real-time cloud backups, and restore in one click from anywhere.'
	);
	const videoPressLightboxDescription = translate(
		'Own your content: High-quality, ad-free video built specifically for WordPress.'
	);
	const antiSpamLightboxDescription = translate(
		'Automatically clear spam from your comments and forms.'
	);
	const scanLightboxDescription = translate(
		'Keep your site or store ahead of security threats with automated malware scanning; including one-click fixes.'
	);
	const searchLightboxDescription = translate(
		'Incredibly powerful and customizable, Jetpack Search helps your visitors instantly find the right content - right when they need it.'
	);
	const boostLightboxDescription = translate(
		'Jetpack Boost gives your site the same performance advantages as the world’s leading websites, no developer required.'
	);
	const socialLightboxDescription = translate(
		'Easily share your website content on your social media channels from one place.'
	);
	//TODO: Fill the right value.
	const socialAdvancedLightboxDescription = translate(
		'Easily share your website content on your social media channels from one place.'
	);

	return {
		[ PRODUCT_JETPACK_BACKUP_DAILY ]: backupDailyLightboxDescription,
		[ PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY ]: backupDailyLightboxDescription,
		[ PRODUCT_JETPACK_BACKUP_REALTIME ]: backupLightboxDescription,
		[ PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY ]: backupLightboxDescription,
		[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: backupLightboxDescription,
		[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: backupLightboxDescription,
		[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: backupLightboxDescription,
		[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: backupLightboxDescription,
		[ PRODUCT_JETPACK_VIDEOPRESS ]: videoPressLightboxDescription,
		[ PRODUCT_JETPACK_VIDEOPRESS_MONTHLY ]: videoPressLightboxDescription,
		[ PRODUCT_JETPACK_ANTI_SPAM ]: antiSpamLightboxDescription,
		[ PRODUCT_JETPACK_ANTI_SPAM_MONTHLY ]: antiSpamLightboxDescription,
		[ PRODUCT_JETPACK_SCAN ]: scanLightboxDescription,
		[ PRODUCT_JETPACK_SCAN_MONTHLY ]: scanLightboxDescription,
		[ PRODUCT_JETPACK_SCAN_REALTIME ]: scanLightboxDescription,
		[ PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY ]: scanLightboxDescription,
		[ PRODUCT_JETPACK_SEARCH ]: searchLightboxDescription,
		[ PRODUCT_JETPACK_SEARCH_MONTHLY ]: searchLightboxDescription,
		[ PRODUCT_JETPACK_BOOST ]: boostLightboxDescription,
		[ PRODUCT_JETPACK_BOOST_MONTHLY ]: boostLightboxDescription,
		[ PRODUCT_JETPACK_SOCIAL_BASIC ]: socialLightboxDescription,
		[ PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY ]: socialLightboxDescription,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED ]: socialAdvancedLightboxDescription,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY ]: socialAdvancedLightboxDescription,
	};
};

export const getJetpackProductsWhatIsIncluded = (): Record< string, Array< TranslateResult > > => {
	const realTimeBackup = translate( 'Real-time backups as you edit' );

	const orderBackups = translate( 'WooCommerce order and table backups' );
	const cloudBackups = translate( 'Redundant cloud backups on our global network' );
	const prioritySupport = translate( 'Priority support' );

	const backupIncludesInfoT1Storage = translate( '10GB of cloud storage' );
	const backupIncludesInfoT2Storage = translate(
		'{{strong}}1TB (1,000GB){{/strong}} of cloud storage',
		{
			components: {
				strong: <strong />,
			},
		}
	);

	const backupIncludesInfoT1Log = translate( '30-day activity log archive' );
	const backupIncludesInfoT2Log = translate( '{{strong}}1 year{{/strong}} activity log archive', {
		components: {
			strong: <strong />,
		},
	} );

	const oneClickRestoreT1 = translate( 'Unlimited one-click restores from the last 30 days' );
	const oneClickRestoreT2 = translate(
		'Unlimited one-click restores from the last {{strong}}1 year{{/strong}}',
		{
			components: {
				strong: <strong />,
			},
		}
	);

	const otherIncludes = [ orderBackups, cloudBackups, prioritySupport ];
	const backupIncludesInfoT1 = [
		realTimeBackup,
		backupIncludesInfoT1Storage,
		backupIncludesInfoT1Log,
		oneClickRestoreT1,
		...otherIncludes,
	];
	const backupIncludesInfoT2 = [
		realTimeBackup,
		backupIncludesInfoT2Storage,
		backupIncludesInfoT2Log,
		oneClickRestoreT2,
		...otherIncludes,
	];

	const videoPressIncludesInfo = [
		translate( '1TB of cloud-hosted video' ),
		translate( 'Customizable video player' ),
		translate( 'Fast-motion video with 60 FPS and 4K resolution' ),
		translate( 'Global CDN' ),
		translate( 'Powerful and reliable hosting infrastructure' ),
		translate( 'Video and story blocks' ),
		translate( 'Unlimited logins for team members' ),
	];
	const antiSpamIncludesInfo = [
		translate( 'Comment and form spam protection' ),
		translate( '10K API calls per month' ),
		translate( 'Akismet technology - 500B+ spam comments blocked to date' ),
		translate( 'Flexible API that works with any type of site' ),
	];
	const scanIncludesInfo = [
		translate( 'Website firewall (WAF beta)' ),
		translate( 'Automated daily scanning' ),
		translate( 'One-click fixes for most issues' ),
		translate( 'Instant email threat notifications' ),
		translate( 'Priority support' ),
	];
	const searchIncludesInfo = [
		translate( 'Instant search, filtering, and indexing' ),
		translate( 'Highly relevant search results' ),
		translate( 'Supports 38 languages' ),
		translate( 'Quick and accurate spelling correction' ),
	];
	const boostIncludesInfo = [
		translate( '{{strong}}Automated critical CSS{{/strong}}', {
			components: {
				strong: <strong />,
			},
		} ),
		translate( 'Site performance scores' ),
		translate( 'One-click optimization' ),
		translate( 'Defer non-essential JavaScript' ),
		translate( 'Optimize CSS loading' ),
		translate( 'Lazy image loading' ),
	];
	const socialBasicIncludesInfo = [
		translate( 'Automatically share your posts and products on social media' ),
		translate( 'Post to multiple channels at once' ),
		translate( 'Manage all of your channels from a single hub' ),
		translate( 'Scheduled posts' ),
		translate( 'Share to Twitter, Facebook, LinkedIn, and Tumblr' ),
	];
	const socialAdvancedIncludesInfo = [
		translate( 'Automatically share your posts and products on social media' ),
		translate( 'Post to multiple channels at once' ),
		translate( 'Manage all of your channels from a single hub' ),
		translate( 'Scheduled posts' ),
		translate( 'Share to Twitter, Facebook, LinkedIn, and Tumblr' ),
		translate( 'Engagement Optimizer' ),
		translate( 'Recycle content' ),
		translate( 'Coming soon: Image generator' ),
		translate( 'Coming soon: Multi-image sharing' ),
		translate( 'Coming soon: Video sharing' ),
	];

	return {
		[ PRODUCT_JETPACK_BACKUP_DAILY ]: backupIncludesInfoT1,
		[ PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY ]: backupIncludesInfoT1,
		[ PRODUCT_JETPACK_BACKUP_REALTIME ]: backupIncludesInfoT1,
		[ PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY ]: backupIncludesInfoT1,
		[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: backupIncludesInfoT1,
		[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: backupIncludesInfoT1,
		[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: backupIncludesInfoT2,
		[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: backupIncludesInfoT2,
		[ PRODUCT_JETPACK_VIDEOPRESS ]: videoPressIncludesInfo,
		[ PRODUCT_JETPACK_VIDEOPRESS_MONTHLY ]: videoPressIncludesInfo,
		[ PRODUCT_JETPACK_ANTI_SPAM ]: antiSpamIncludesInfo,
		[ PRODUCT_JETPACK_ANTI_SPAM_MONTHLY ]: antiSpamIncludesInfo,
		[ PRODUCT_JETPACK_SCAN ]: scanIncludesInfo,
		[ PRODUCT_JETPACK_SCAN_MONTHLY ]: scanIncludesInfo,
		[ PRODUCT_JETPACK_SCAN_REALTIME ]: scanIncludesInfo,
		[ PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY ]: scanIncludesInfo,
		[ PRODUCT_JETPACK_SEARCH ]: searchIncludesInfo,
		[ PRODUCT_JETPACK_SEARCH_MONTHLY ]: searchIncludesInfo,
		[ PRODUCT_JETPACK_BOOST ]: boostIncludesInfo,
		[ PRODUCT_JETPACK_BOOST_MONTHLY ]: boostIncludesInfo,
		[ PRODUCT_JETPACK_SOCIAL_BASIC ]: socialBasicIncludesInfo,
		[ PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY ]: socialBasicIncludesInfo,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED ]: socialAdvancedIncludesInfo,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY ]: socialAdvancedIncludesInfo,
	};
};

export const getJetpackProductsBenefits = (): Record< string, Array< TranslateResult > > => {
	const backupBenefits = [
		translate( 'Protect your revenue stream and content' ),
		translate( 'Restore your site in one click from desktop or mobile' ),
		translate( 'Restore or clone offline sites' ),
		translate( 'Fix your site without a developer' ),
		translate( 'Protect Woo order and customer data' ),
		translate( 'Best-in-class support from WordPress experts' ),
	];

	const scanBenefits = [
		translate( 'Protect your revenue stream and content' ),
		translate( 'Learn about issues before your customers are impacted' ),
		translate( 'Fix most issues in one click from desktop or mobile' ),
		translate( 'Best-in-class support from WordPress experts' ),
	];
	const antiSpamBenefits = [
		translate( 'Set up in minutes without a developer' ),
		translate( 'Save time manually reviewing spam' ),
		translate( 'Increase engagement by removing CAPTCHAs' ),
		translate( 'Best-in-class support from WordPress experts' ),
	];
	const videoPressBenefits = [
		translate( 'Increase engagement and get your message across' ),
		translate( 'Drag and drop videos through the WordPress editor' ),
		translate( 'Manage videos in the WordPress media library' ),
		translate( 'Remove distracting ads' ),
		translate( 'Customizable colors to fit your brand and site' ),
		translate( 'Best-in-class support from WordPress experts' ),
	];

	const searchBenefits = [
		translate( "Customizable to fit your site's design" ),
		translate( 'Increase conversion with accurate search results' ),
		translate( 'Tiered pricing - pay for only what you need' ),
		translate( 'No developer required' ),
		translate( 'Best-in-class support from WordPress experts' ),
	];

	const boostBenefits = [
		translate( 'Quickly test and improve your site speed' ),
		translate( "Improve your site's SEO" ),
		translate( 'Get faster FCP and LCP' ),
		translate( 'No developer required' ),
		translate( 'Best-in-class support from WordPress experts' ),
	];

	const socialBenefits = [
		translate( 'Save time by sharing your posts automatically' ),
		translate( 'Unlock your growth potential by building a following on social media' ),
		translate( 'Easy-to-use interface' ),
		translate( 'No developer required' ),
	];

	//TODO: fill in the actual values.
	const socialAdvancedBenefits = [
		translate( 'Save time by sharing your posts automatically' ),
		translate( 'Unlock your growth potential by building a following on social media' ),
		translate( 'Easy-to-use interface' ),
		translate( 'No developer required' ),
		translate( 'Enhance social media engagement with personalized posts' ),
		translate( 'Repurpose, reuse or republish already published content' ),
		translate(
			'Coming soon: Automatically create custom images, saving you hours of tedious work'
		),
		translate( 'Coming soon: Share multiple images at once on social media platforms' ),
		translate( 'Coming soon: Upload and share videos to your social platforms' ),
	];

	return {
		[ PRODUCT_JETPACK_BACKUP_DAILY ]: backupBenefits,
		[ PRODUCT_JETPACK_BACKUP_DAILY_MONTHLY ]: backupBenefits,
		[ PRODUCT_JETPACK_BACKUP_REALTIME ]: backupBenefits,
		[ PRODUCT_JETPACK_BACKUP_REALTIME_MONTHLY ]: backupBenefits,
		[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: backupBenefits,
		[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: backupBenefits,
		[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: backupBenefits,
		[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: backupBenefits,
		[ PRODUCT_JETPACK_VIDEOPRESS ]: videoPressBenefits,
		[ PRODUCT_JETPACK_VIDEOPRESS_MONTHLY ]: videoPressBenefits,
		[ PRODUCT_JETPACK_ANTI_SPAM ]: antiSpamBenefits,
		[ PRODUCT_JETPACK_ANTI_SPAM_MONTHLY ]: antiSpamBenefits,
		[ PRODUCT_JETPACK_SCAN ]: scanBenefits,
		[ PRODUCT_JETPACK_SCAN_MONTHLY ]: scanBenefits,
		[ PRODUCT_JETPACK_SCAN_REALTIME ]: scanBenefits,
		[ PRODUCT_JETPACK_SCAN_REALTIME_MONTHLY ]: scanBenefits,
		[ PRODUCT_JETPACK_SEARCH ]: searchBenefits,
		[ PRODUCT_JETPACK_SEARCH_MONTHLY ]: searchBenefits,
		[ PRODUCT_JETPACK_BOOST ]: boostBenefits,
		[ PRODUCT_JETPACK_BOOST_MONTHLY ]: boostBenefits,
		[ PRODUCT_JETPACK_SOCIAL_BASIC ]: socialBenefits,
		[ PRODUCT_JETPACK_SOCIAL_BASIC_MONTHLY ]: socialBenefits,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED ]: socialAdvancedBenefits,
		[ PRODUCT_JETPACK_SOCIAL_ADVANCED_MONTHLY ]: socialAdvancedBenefits,
	};
};

export const getJetpackProductsRecommendedFor = (): Record< string, TranslateResult > => {
	return {
		[ JETPACK_TAG_FOR_WOOCOMMERCE_STORES ]: translate( 'WooCommerce stores' ),
		[ JETPACK_TAG_FOR_NEWS_ORGANISATIONS ]: translate( 'News organizations' ),
		[ JETPACK_TAG_FOR_MEMBERSHIP_SITES ]: translate( 'Membership sites' ),
		[ JETPACK_TAG_FOR_ONLINE_FORUMS ]: translate( 'Online forums' ),
		[ JETPACK_TAG_FOR_BLOGS ]: translate( 'Blogs' ),
		[ JETPACK_TAG_FOR_VIDEOGRAPHERS ]: translate( 'Videographers' ),
		[ JETPACK_TAG_FOR_EDUCATORS ]: translate( 'Educators' ),
		[ JETPACK_TAG_FOR_BLOGGERS ]: translate( 'Bloggers' ),
		[ JETPACK_TAG_FOR_ALL_SITES ]: translate( 'All sites' ),
	};
};

export const useJetpack10GbStorageAmountText = (): TranslateResult => {
	const _translate = useTranslate();

	return useMemo(
		() =>
			_translate( '%(numberOfGigabytes)dGB', '%(numberOfGigabytes)dGB', {
				comment:
					'Displays an amount of gigabytes. Plural string used in case GB needs to be pluralized.',
				count: 10,
				args: { numberOfGigabytes: 10 },
			} ),
		[ _translate ]
	);
};

export const useJetpack100GbStorageAmountText = (): TranslateResult => {
	const _translate = useTranslate();

	return useMemo(
		() =>
			_translate( '%(numberOfGigabytes)dGB', '%(numberOfGigabytes)dGB', {
				comment:
					'Displays an amount of gigabytes. Plural string used in case GB needs to be pluralized.',
				count: 100,
				args: { numberOfGigabytes: 100 },
			} ),
		[ _translate ]
	);
};

export const useJetpack1TbStorageAmountText = (): TranslateResult => {
	const _translate = useTranslate();

	return useMemo(
		() =>
			_translate( '%(numberOfTerabytes)dTB', '%(numberOfTerabytes)dTB', {
				comment:
					'Displays an amount of terabytes. Plural string used in case TB needs to be pluralized.',
				count: 1,
				args: { numberOfTerabytes: 1 },
			} ),
		[ _translate ]
	);
};

export const useJetpackStorageAmountTextByProductSlug = (
	productSlug: string
): TranslateResult | undefined => {
	const TEN_GIGABYTES = useJetpack10GbStorageAmountText();
	const ONE_TERABYTE = useJetpack1TbStorageAmountText();

	return useMemo(
		() =>
			( {
				[ PRODUCT_JETPACK_BACKUP_T1_MONTHLY ]: TEN_GIGABYTES,
				[ PRODUCT_JETPACK_BACKUP_T1_YEARLY ]: TEN_GIGABYTES,
				[ PRODUCT_JETPACK_BACKUP_T2_MONTHLY ]: ONE_TERABYTE,
				[ PRODUCT_JETPACK_BACKUP_T2_YEARLY ]: ONE_TERABYTE,

				[ PLAN_JETPACK_SECURITY_T1_MONTHLY ]: TEN_GIGABYTES,
				[ PLAN_JETPACK_SECURITY_T1_YEARLY ]: TEN_GIGABYTES,
				[ PLAN_JETPACK_SECURITY_T2_MONTHLY ]: ONE_TERABYTE,
				[ PLAN_JETPACK_SECURITY_T2_YEARLY ]: ONE_TERABYTE,
			}[ productSlug ] ),
		[ TEN_GIGABYTES, ONE_TERABYTE, productSlug ]
	);
};
