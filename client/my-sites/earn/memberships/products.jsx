import {
	FEATURE_DONATIONS,
	FEATURE_PREMIUM_CONTENT_CONTAINER,
	FEATURE_RECURRING_PAYMENTS,
} from '@automattic/calypso-products';
import { Button, CompactCard, Gridicon } from '@automattic/components';
import formatCurrency from '@automattic/format-currency';
import { localize } from 'i18n-calypso';
import { Component } from 'react';
import { connect } from 'react-redux';
import UpsellNudge from 'calypso/blocks/upsell-nudge';
import QueryMembershipProducts from 'calypso/components/data/query-memberships';
import QueryMembershipsSettings from 'calypso/components/data/query-memberships-settings';
import EllipsisMenu from 'calypso/components/ellipsis-menu';
import HeaderCake from 'calypso/components/header-cake';
import PopoverMenuItem from 'calypso/components/popover-menu/item';
import SectionHeader from 'calypso/components/section-header';
import { bumpStat } from 'calypso/state/analytics/actions';
import { getProductsForSiteId } from 'calypso/state/memberships/product-list/selectors';
import { getConnectedAccountIdForSiteId } from 'calypso/state/memberships/settings/selectors';
import siteHasFeature from 'calypso/state/selectors/site-has-feature';
import {
	getSelectedSite,
	getSelectedSiteId,
	getSelectedSiteSlug,
} from 'calypso/state/ui/selectors';
import RecurringPaymentsPlanAddEditModal from './add-edit-plan-modal';
import RecurringPaymentsPlanDeleteModal from './delete-plan-modal';
import MembershipsSection from './';
import './style.scss';

class MembershipsProductsSection extends Component {
	state = {
		showAddEditDialog:
			window.location.hash === '#add-new-payment-plan' ||
			window.location.hash === '#add-newsletter-payment-plan',
		showDeleteDialog: false,
		product: null,
	};

	renderEllipsisMenu( productId ) {
		return (
			<EllipsisMenu position="bottom left">
				{ this.props.hasStripeFeature && (
					<PopoverMenuItem onClick={ () => this.openAddEditDialog( productId ) }>
						<Gridicon size={ 18 } icon="pencil" />
						{ this.props.translate( 'Edit' ) }
					</PopoverMenuItem>
				) }
				<PopoverMenuItem onClick={ () => this.openDeleteDialog( productId ) }>
					<Gridicon size={ 18 } icon="trash" />
					{ this.props.translate( 'Delete' ) }
				</PopoverMenuItem>
			</EllipsisMenu>
		);
	}

	openAddEditDialog = ( productId ) => {
		if ( productId ) {
			const product = this.props.products.find( ( prod ) => prod.ID === productId );
			this.setState( { showAddEditDialog: true, product } );
		} else {
			this.setState( { showAddEditDialog: true, product: null } );
		}
	};

	openDeleteDialog = ( productId ) => {
		if ( productId ) {
			const product = this.props.products.find( ( prod ) => prod.ID === productId );
			this.setState( { showDeleteDialog: true, product } );
		}
	};

	closeDialog = () => this.setState( { showAddEditDialog: false, showDeleteDialog: false } );

	render() {
		// This will take the hash into account only when ading a new product
		const subscribe_as_site_subscriber = this.state.product
			? this.state.product?.subscribe_as_site_subscriber
			: window.location.hash === '#add-newsletter-payment-plan';

		return (
			<div>
				<QueryMembershipsSettings siteId={ this.props.siteId } />
				<QueryMembershipProducts siteId={ this.props.siteId } />
				<HeaderCake backHref={ '/earn/payments/' + this.props.siteSlug }>
					{ this.props.translate( 'Payment plans' ) }
				</HeaderCake>

				{ ! this.props.hasStripeFeature && (
					// Purposefully isn't a dismissible nudge as without this nudge, the page would appear to be
					// broken as it only does listing and deleting of plans and it wouldn't be clear how to change that.
					<UpsellNudge
						title={ this.props.translate( 'Upgrade to modify payment plans or add new plans' ) }
						href={ '/plans/' + this.props.siteSlug }
						showIcon={ true }
						onClick={ () => this.props.trackUpgrade() }
						// This could be any stripe payment features (see `hasStripeFeature`) but UpsellNudge only
						// supports 1. They're all available on the same plans anyway, so practically it's ok to pick 1.
						feature={ FEATURE_RECURRING_PAYMENTS }
						event="calypso_earn_page_payment_plans_upgrade_nudge"
						tracksClickName="calypso_earn_page_payment_plans_upgrade_button_click"
						tracksImpressionName="calypso_earn_page_payment_plans_upgrade_button_view"
					/>
				) }

				{ ! this.props.connectedAccountId && (
					<MembershipsSection section={ this.props.section } query={ this.props.query } />
				) }
				{ this.props.hasStripeFeature && this.props.connectedAccountId && (
					<SectionHeader>
						<Button primary compact onClick={ () => this.openAddEditDialog( null ) }>
							{ this.props.translate( 'Add a new payment plan' ) }
						</Button>
					</SectionHeader>
				) }
				{ this.props.products.map( ( product ) => (
					<CompactCard className="memberships__products-product-card" key={ product.ID }>
						<div className="memberships__products-product-details">
							<div className="memberships__products-product-price">
								{ formatCurrency( product.price, product.currency ) }
							</div>
							<div className="memberships__products-product-title">{ product.title }</div>
						</div>

						{ this.renderEllipsisMenu( product.ID ) }
					</CompactCard>
				) ) }
				{ this.state.showAddEditDialog &&
					this.props.hasStripeFeature &&
					this.props.connectedAccountId && (
						<RecurringPaymentsPlanAddEditModal
							closeDialog={ this.closeDialog }
							product={ Object.assign( this.state.product ?? {}, {
								subscribe_as_site_subscriber: subscribe_as_site_subscriber,
							} ) }
						/>
					) }
				{ this.state.showDeleteDialog && (
					<RecurringPaymentsPlanDeleteModal
						closeDialog={ this.closeDialog }
						product={ this.state.product }
					/>
				) }
			</div>
		);
	}
}

export default connect(
	( state ) => {
		const site = getSelectedSite( state );
		const siteId = getSelectedSiteId( state );
		return {
			site,
			siteId,
			siteSlug: getSelectedSiteSlug( state ),
			products: getProductsForSiteId( state, siteId ),
			connectedAccountId: getConnectedAccountIdForSiteId( state, siteId ),
			hasStripeFeature:
				siteHasFeature( state, siteId, FEATURE_PREMIUM_CONTENT_CONTAINER ) ||
				siteHasFeature( state, siteId, FEATURE_DONATIONS ) ||
				siteHasFeature( state, siteId, FEATURE_RECURRING_PAYMENTS ),
		};
	},
	( dispatch ) => ( {
		trackUpgrade: () => dispatch( bumpStat( 'calypso_earn_page', 'payment-plans-upgrade-button' ) ),
	} )
)( localize( MembershipsProductsSection ) );
