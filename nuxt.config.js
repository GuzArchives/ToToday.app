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
			{
				hid: 'description',
				name: 'description',
				content: 'A single page web app to help yours day-to-day tasks',
			},
			{ name: 'format-detection', content: 'telephone=no' },
			// Twitter meta tags
			{
				hid: 'twitter:card',
				name: 'twitter:card',
				content: 'summary',
			},
			{
				hid: 'twitter:title',
				name: 'twitter:title',
				content: 'ToToday',
			},
			{
				hid: 'twitter:image',
				name: 'twitter:image',
				content: '/favicon.ico',
			},
			{
				hid: 'twitter:description',
				name: 'twitter:description',
				content: 'A single page web app to help yours day-to-day tasks',
			},
			{
				hid: 'twitter:creator',
				name: 'twitter:creator',
				content: '@Guz013_',
			},
		],
		link: [
			{
				rel: 'icon',
				type: 'image/x-icon',
				href: '/favicon.ico',
			},
			{
				rel: 'canonical',
				href: 'https://totoday.vercel.app',
			},
		],
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

		'@nuxt/content',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [],

	// PWA module configuration: https://go.nuxtjs.dev/pwa
	pwa: {
		meta: {
			twitterCard: 'summary',
			twitterCreator: '@Guz013_',
		},
		manifest: {
			name: 'ToToday',
			description: 'A single page web app to help yours day-to-day tasks',
			theme_color: '#1a1826',
			background_color: '#1a1826',
			lang: 'en',
		},
	},

	// Color Mode module configuration: https://color-mode.nuxtjs.org/
	colorMode: {
		preference: 'dark',
	},

	image: {
		screens: {
			ToTodayLogoLg: 250,
		},
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},
};
