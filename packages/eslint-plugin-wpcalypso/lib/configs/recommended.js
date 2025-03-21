module.exports = {
	env: {
		es6: true,
	},
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: [ 'eslint:recommended', 'plugin:jsdoc/recommended' ],
	plugins: [ 'jsdoc', 'wpcalypso', 'inclusive-language' ],
	settings: {
		jsdoc: {
			preferredTypes: {
				// Enforce capitalized "Object" types to align with WordPress
				// standards and to provide auto-fix.
				object: 'Object',
			},
		},
	},
	rules: {
		'array-bracket-spacing': [ 'error', 'always' ],
		'brace-style': [ 'error', '1tbs' ],
		camelcase: 'error',
		'comma-dangle': [ 'error', 'always-multiline' ],
		'comma-spacing': 'error',
		'comma-style': 'error',
		'computed-property-spacing': [ 'error', 'always' ],
		'constructor-super': 'error',
		// Allows returning early as undefined
		'consistent-return': 'off',
		curly: 'error',
		'dot-notation': 'error',
		eqeqeq: [ 'error', 'allow-null' ],
		'eol-last': 'error',
		'func-call-spacing': 'error',
		indent: [ 'error', 'tab', { SwitchCase: 1 } ],
		'jsx-quotes': [ 'error', 'prefer-double' ],
		'key-spacing': 'error',
		'keyword-spacing': 'error',
		'max-len': [ 'error', { code: 100 } ],
		'new-cap': [ 'error', { capIsNew: false, newIsCap: true } ],
		'no-cond-assign': 'error',
		'no-const-assign': 'error',
		'no-console': 'error',
		'no-debugger': 'error',
		'no-dupe-args': 'error',
		'no-dupe-keys': 'error',
		'no-duplicate-case': 'error',
		'no-duplicate-imports': 'error',
		'no-else-return': 'error',
		'no-empty': [ 'error', { allowEmptyCatch: true } ],
		'no-extra-semi': 'error',
		'no-fallthrough': 'off',
		'no-lonely-if': 'error',
		'no-mixed-requires': 'off',
		'no-mixed-spaces-and-tabs': 'error',
		'no-multiple-empty-lines': [ 'error', { max: 1 } ],
		'no-multi-spaces': 'error',
		'no-negated-in-lhs': 'error',
		'no-nested-ternary': 'error',
		'no-new': 'error',
		'no-process-exit': 'error',
		'no-prototype-builtins': 'off', // we've been using this for years without real issue
		'no-redeclare': 'error',
		'no-shadow': 'error',
		'no-spaced-func': 'error',
		'no-trailing-spaces': 'error',
		'no-undef': 'error',
		'no-underscore-dangle': 'off',
		'no-unreachable': 'error',
		// Ignore rest siblings used to omit properties from objects: const { a, b, ...rest } = props
		'no-unused-vars': [ 'error', { ignoreRestSiblings: true } ],
		// Allows function use before declaration
		'no-use-before-define': [ 'error', 'nofunc' ],
		'no-var': 'error',
		'object-curly-spacing': [ 'error', 'always' ],
		'one-var': 'off',
		'operator-linebreak': [
			'error',
			'after',
			{
				overrides: {
					'?': 'before',
					':': 'before',
				},
			},
		],
		'padded-blocks': [ 'error', 'never' ],
		'prefer-const': 'error',
		'quote-props': [ 'error', 'as-needed' ],
		quotes: [ 'error', 'single', 'avoid-escape' ],
		semi: 'error',
		'semi-spacing': 'error',
		'space-before-blocks': [ 'error', 'always' ],
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'never',
				asyncArrow: 'always',
				named: 'never',
			},
		],
		'space-in-parens': [ 'error', 'always' ],
		'space-infix-ops': [ 'error', { int32Hint: false } ],
		'space-unary-ops': [
			'error',
			{
				overrides: {
					'!': true,
				},
			},
		],
		// Assumed by default with Babel
		strict: [ 'error', 'never' ],
		'template-curly-spacing': [ 'error', 'always' ],

		// jsdoc plugin
		'jsdoc/check-access': 'error',
		'jsdoc/check-alignment': 'error',
		'jsdoc/check-param-names': 'error',
		'jsdoc/check-tag-names': 'off',
		// Without unifyParentAndChildTypeChecks, "{object<string, string>}" or
		// "{object|number}" would be allowed. Since preferredTypes should rewrite
		// "object" to "Object", we need this setting to be true to also apply to
		// scenarios like unions and generics.
		'jsdoc/check-types': [ 'error', { unifyParentAndChildTypeChecks: true } ],
		'jsdoc/check-values': 'error',
		'jsdoc/empty-tags': 'error',
		'jsdoc/implements-on-classes': 'error',
		'jsdoc/newline-after-description': 'error',
		'jsdoc/no-undefined-types': 'error',
		'jsdoc/require-jsdoc': 'off',
		'jsdoc/require-param': 'error',
		'jsdoc/require-param-description': 'error',
		'jsdoc/require-param-name': 'error',
		'jsdoc/require-param-type': 'off',
		'jsdoc/require-returns': 'off',
		'jsdoc/require-returns-check': 'error',
		'jsdoc/require-returns-description': 'error',
		'jsdoc/require-returns-type': 'off',
		'jsdoc/valid-types': 'off',

		// wpcalypso plugin
		'wpcalypso/i18n-ellipsis': 'error',
		'wpcalypso/i18n-no-collapsible-whitespace': 'error',
		'wpcalypso/i18n-no-variables': 'error',
		'wpcalypso/i18n-no-placeholders-only': 'error',
		'wpcalypso/i18n-no-this-translate': 'error',
		'wpcalypso/i18n-mismatched-placeholders': 'error',
		'wpcalypso/i18n-named-placeholders': 'error',
		'wpcalypso/jsx-gridicon-size': 'error',
		'wpcalypso/jsx-classname-namespace': 'error',
		'wpcalypso/redux-no-bound-selectors': 'error',
		'wpcalypso/no-unsafe-wp-apis': 'error',

		yoda: 'off',

		// Ensure our codebases use inclusive language
		'inclusive-language/use-inclusive-words': 'error',
	},
};
