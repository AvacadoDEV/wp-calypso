import page from 'page';
import { stringify } from 'qs';
import AsyncLoad from 'calypso/components/async-load';
import {
	trackPageLoad,
	trackUpdatesLoaded,
	trackScrollPage,
} from 'calypso/reader/controller-helper';
import { SEARCH_TYPES } from 'calypso/reader/search-stream/search-stream-header';
import { recordTrack } from 'calypso/reader/stats';

const analyticsPageTitle = 'Reader';

// TODO: delete this after launching sites in search
function replaceSearchUrl( newValue, sort ) {
	let searchUrl = '/read/search';
	if ( newValue ) {
		searchUrl += '?' + stringify( { q: newValue, sort } );
	}
	page.replace( searchUrl );
}

const exported = {
	search: function ( context, next ) {
		const basePath = '/read/search';
		const fullAnalyticsPageTitle = analyticsPageTitle + ' > Search';
		const mcKey = 'search';

		const { sort = 'relevance', q, show = SEARCH_TYPES.POSTS } = context.query;
		const searchSlug = q;

		let streamKey;
		let isQuerySuggestion = false;
		if ( searchSlug ) {
			streamKey = 'search:' + JSON.stringify( { sort, q } );
			isQuerySuggestion = context.query.isSuggestion === '1';
		} else {
			streamKey = 'custom_recs_posts_with_images';
		}

		trackPageLoad( basePath, fullAnalyticsPageTitle, mcKey );
		if ( searchSlug ) {
			recordTrack( 'calypso_reader_search_performed', {
				query: searchSlug,
				sort,
			} );
		} else {
			recordTrack( 'calypso_reader_search_loaded' );
		}

		const autoFocusInput = ! searchSlug || context.query.focus === '1';

		function reportQueryChange( query ) {
			replaceSearchUrl( query, sort !== 'relevance' ? sort : undefined );
		}

		function reportSortChange( newSort ) {
			replaceSearchUrl( searchSlug, newSort !== 'relevance' ? newSort : undefined );
		}

		context.primary = (
			<AsyncLoad
				require="calypso/reader/search-stream"
				key="search"
				streamKey={ streamKey }
				isSuggestion={ isQuerySuggestion }
				query={ searchSlug }
				sort={ sort }
				trackScrollPage={ trackScrollPage.bind(
					null,
					basePath,
					fullAnalyticsPageTitle,
					analyticsPageTitle,
					mcKey
				) }
				onUpdatesShown={ trackUpdatesLoaded.bind( null, mcKey ) }
				showBack={ false }
				showPrimaryFollowButtonOnCards={ false }
				autoFocusInput={ autoFocusInput }
				onQueryChange={ reportQueryChange }
				onSortChange={ reportSortChange }
				searchType={ show }
			/>
		);
		next();
	},
};

export default exported;

export const { search } = exported;
