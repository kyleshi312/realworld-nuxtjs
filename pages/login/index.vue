<template>
	<div class="auth-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center" v-if="isLogin">Sign in</h1>
					<h1 class="text-xs-center" v-if="!isLogin">Sign up</h1>
					<div class="text-xs-center" v-if="!isLogin">
						<nuxt-link to="/login">Have an account?</nuxt-link>
					</div>
					<div class="text-xs-center" v-if="isLogin">
						<nuxt-link to="/register">Need an account?</nuxt-link>
					</div>
					<ul class="error-messages">
						<template v-for="(messages, field) in errors">
							<li v-for="message in messages" :key="message">{{ field }} {{ message }}</li>
						</template>
					</ul>

					<form @submit.prevent="onSubmit">
						<fieldset class="form-group" v-if="!isLogin">
							<input
								v-model="user.username"
								class="form-control form-control-lg"
								type="text"
								placeholder="Your Name"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								v-model="user.email"
								class="form-control form-control-lg"
								type="email"
								placeholder="Email"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								v-model="user.password"
								class="form-control form-control-lg"
								type="password"
								placeholder="Password"
							/>
						</fieldset>
						<button class="btn btn-lg btn-primary pull-xs-right">
							{{ isLogin ? 'Sign in' : 'Sign up' }}
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { login, register } from '@/api/user';
import request from '@/utils/request';

const Cookie = process.client ? require('js-cookie') : undefined;

export default {
	name: 'LoginIndex',
	middleware: 'notAuthenticated',
	data() {
		return {
			user: {
				username: '',
				email: 'asdfasdfasdf@jake.com',
				password: '',
			},
			errors: {},
		};
	},
	computed: {
		isLogin() {
			return this.$route.name === 'Login';
		},
	},
	methods: {
		async onSubmit() {
			// login request
			try {
				console.log('login');
				const { data } = this.isLogin ? await login(this.user) : await register(this.user);

				this.$store.commit('setUser', JSON.stringify(data.user));
				Cookie.set('user', JSON.stringify(data.user));
				this.$router.push('/');
			} catch (e) {
				console.dir(e);
				this.errors = e.response.data.errors;
			}
		},
	},
};
</script>
