import {
	ECOMMERCE_FLOW,
	LINK_IN_BIO_FLOW,
	LINK_IN_BIO_TLD_FLOW,
	FREE_FLOW,
	COPY_SITE_FLOW,
} from '../utils/flows';

/* eslint-disable no-restricted-imports */
interface FlowProgress {
	stepName?: string;
	flowName?: string;
}

const flows: Record< string, { [ step: string ]: number } > = {
	newsletter: {
		intro: 0,
		user: 0,
		newsletterSetup: 1,
		domains: 2,
		'plans-newsletter': 3,
		subscribers: 4,
		launchpad: 5,
	},
	[ LINK_IN_BIO_FLOW ]: {
		intro: 0,
		user: 0,
		patterns: 1,
		linkInBioSetup: 2,
		domains: 3,
		plans: 4,
		launchpad: 5,
	},
	[ LINK_IN_BIO_TLD_FLOW ]: {
		domains: 0,
		user: 1,
		patterns: 2,
		linkInBioSetup: 3,
		plans: 4,
		launchpad: 5,
	},
	[ FREE_FLOW ]: {
		intro: 0,
		user: 0,
		freeSetup: 1,
		designSetup: 2,
		launchpad: 3,
	},
	videopress: {
		intro: 0,
		videomakerSetup: 1,
		user: 2,
		options: 3,
		chooseADomain: 4,
		chooseAPlan: 5,
		processing: 6,
		launchpad: 7,
	},
	[ ECOMMERCE_FLOW ]: {
		intro: 0,
		storeProfiler: 1,
		designCarousel: 2,
		domains: 3,
		siteCreationStep: 4,
		processing: 4,
		waitForAtomic: 4,
		checkPlan: 4,
		storeAddress: 5,
	},
	[ COPY_SITE_FLOW ]: {
		domains: 0,
		'site-creation-step': 1,
		processing: 2,
		'automated-copy': 3,
		'processing-copy': 3,
	},
};

export const useFlowProgress = ( { stepName, flowName }: FlowProgress = {} ) => {
	if ( ! stepName || ! flowName ) {
		return;
	}

	const flow = flows[ flowName ];

	return (
		flow && {
			progress: flow[ stepName ],
			count: Math.max( ...Object.values( flow ) ),
		}
	);
};
