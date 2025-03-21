import { TranslateResult, translate } from 'i18n-calypso';
import { filePathValidator } from 'calypso/lib/validation';

export enum FormMode {
	Password,
	PrivateKey,
}

export interface Credentials {
	type: 'ssh' | 'ftp' | 'dynamic-ssh';
	host: string;
	port: number | '';
	user: string;
	path: string;
}

export interface FormState {
	protocol: 'ssh' | 'ftp' | 'dynamic-ssh';
	host: string;
	port: number | '';
	user: string;
	pass: string;
	path: string;
	kpri: string;
}

export const INITIAL_FORM_STATE: FormState = {
	protocol: 'ftp',
	host: '',
	port: 21,
	user: '',
	pass: '',
	path: '',
	kpri: '',
};

export interface FormInteractions {
	host: boolean;
	port: boolean;
	user: boolean;
	pass: boolean;
	path: boolean;
	kpri: boolean;
}

export const INITIAL_FORM_INTERACTION: FormInteractions = {
	host: false,
	port: false,
	user: false,
	pass: false,
	path: false,
	kpri: false,
};

interface Error {
	message: TranslateResult;
	waitForInteraction: boolean;
}
export interface FormErrors {
	protocol?: Error;
	host?: Error;
	port?: Error;
	user?: Error;
	pass?: Error;
	path?: Error;
	kpri?: Error;
}

export const INITIAL_FORM_ERRORS: FormErrors = {};

export const validate = ( formState: FormState, mode: FormMode ): FormErrors => {
	const formErrors: FormErrors = {};
	// user checking
	if ( ! formState.user ) {
		formErrors.user = {
			message: translate( 'Please enter your server username.' ),
			waitForInteraction: true,
		};
	} else if ( 'root' === formState.user ) {
		formErrors.user = {
			message: translate(
				"We can't accept credentials for the root user. " +
					'Please provide or create credentials for another user with access to your server.'
			),
			waitForInteraction: true,
		};
	}
	// host checking
	if ( ! formState.host ) {
		formErrors.host = {
			message: translate( 'Please enter a valid server address.' ),
			waitForInteraction: true,
		};
	}
	// port checking
	if ( typeof formState.port === 'string' ) {
		formErrors.port = {
			message: translate( 'Please enter a valid port number.' ),
			waitForInteraction: true,
		};
	}

	const pathValidationResult = filePathValidator( formState.path );
	if ( formState.path !== '' && pathValidationResult !== null ) {
		formErrors.path = {
			message: pathValidationResult.message,
			waitForInteraction: true,
		};
	}

	if ( FormMode.Password === mode && ! formState.pass ) {
		formErrors.pass = {
			message: translate( 'Please enter your server password.' ),
			waitForInteraction: true,
		};
	}

	if ( FormMode.PrivateKey === mode && ! formState.kpri ) {
		formErrors.kpri = {
			message: translate( 'Please enter your private key.' ),
			waitForInteraction: true,
		};
	}

	return formErrors;
};
