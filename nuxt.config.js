// nuxt js configure file

module.exports = {
	router: {
		linkActiveClass: 'active',
		extendRoutes(routes, resolve) {
			routes.splice(0);
			routes.push(
				...[
					{
						path: '/',
						component: resolve(__dirname, 'pages/layout/index.vue'),
						children: [
							{
								path: '/', // default child router
								name: 'home',
								component: resolve(__dirname, 'pages/home'),
							},
							{
								path: 'login', // default child router
								name: 'Login',
								component: resolve(__dirname, 'pages/login'),
							},
							{
								path: 'register', // default child router
								name: 'Register',
								component: resolve(__dirname, 'pages/login'),
							},
							{
								path: 'profile/:username', // default child router
								name: 'Profile',
								component: resolve(__dirname, 'pages/profile'),
							},
							{
								path: 'settings', // default child router
								name: 'Settings',
								component: resolve(__dirname, 'pages/setting'),
							},
							{
								path: 'editor', // default child router
								name: 'Editor',
								component: resolve(__dirname, 'pages/editor'),
							},
							{
								path: 'article/:slug', // default child router
								name: 'Article',
								component: resolve(__dirname, 'pages/article'),
							},
						],
					},
				]
			);
		},
	},
	plugins: ['./plugins/request.js', './plugins/dayjs.js'],
	server: {
		host: '0.0.0.0',
		port: 3050,
	},
};
