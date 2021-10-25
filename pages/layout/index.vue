<template>
	<div>
		<html>
			<head>
				<meta charset="utf-8" />
				<title>Conduit</title>
				<!-- Import Ionicon icons & Google Fonts our Bootstrap theme relies on -->
				<link
					to="//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
					rel="stylesheet"
					type="text/css"
				/>
				<link
					to="//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic"
					rel="stylesheet"
					type="text/css"
				/>
				<!-- Import the custom Bootstrap 4 theme from our hosted CDN -->
				<link rel="stylesheet" to="//demo.productionready.io/main.css" />
			</head>
			<body>
				<nav class="navbar navbar-light">
					<div class="container">
						<nuxt-link class="navbar-brand" to="/">kyleshi shi</nuxt-link>
						<ul class="nav navbar-nav pull-xs-right">
							<li class="nav-item">
								<!-- Add "active" class when you're on that page" -->
								<nuxt-link class="nav-link" to="/" exact>Home</nuxt-link>
							</li>
							<template v-if="user">
								<li class="nav-item">
									<nuxt-link class="nav-link" to="/editor">
										<i class="ion-compose"></i>&nbsp;New Post
									</nuxt-link>
								</li>
								<li class="nav-item">
									<nuxt-link class="nav-link" to="/settings">
										<i class="ion-gear-a"></i>&nbsp;Settings
									</nuxt-link>
								</li>
								<li class="nav-item">
									<nuxt-link class="nav-link" to="/profile/123">
										<img class="user-pic" :src="user.image" />
										{{ user.username }}
									</nuxt-link>
								</li>
							</template>
							<template v-else>
								<li class="nav-item">
									<nuxt-link class="nav-link" to="/register">Sign up</nuxt-link>
								</li>
								<li class="nav-item">
									<nuxt-link class="nav-link" to="/login">Sign in</nuxt-link>
								</li>
							</template>
						</ul>
					</div>
				</nav>
				<!-- 子路由 -->
				<nuxt-child />
				<footer>
					<div class="container">
						<nuxt-link to="/" class="logo-font">conduit</nuxt-link>
						<span class="attribution">
							An interactive learning project from
							<nuxt-link to="https://thinkster.io">Thinkster</nuxt-link>. Code &amp; design licensed under
							MIT.
						</span>
					</div>
				</footer>
			</body>
		</html>
	</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
	name: 'LayoutIndex',
	computed: {
		...mapState(['user']),
	},
};
</script>
