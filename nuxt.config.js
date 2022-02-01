export default {
	srcDir: 'src/',
	buildDir: 'dist',
	target: 'static',
	ssr: false,

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'ToToday',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['~/assets/styles/global.scss'],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		// https://go.nuxtjs.dev/stylelint
		'@nuxtjs/stylelint-module',

		'@nuxt/image',

		'@nuxtjs/color-mode',

		'@nuxtjs/pwa',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [],

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		manifest: {
			lang: 'en',
		},
	},

	image: {
		screens: {
			ToTodayLogoLg: 250,
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
};
