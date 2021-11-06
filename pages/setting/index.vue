<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>

					<form>
						<fieldset>
							<fieldset class="form-group">
								<input
									v-model="curUser.iamge"
									class="form-control"
									type="text"
									placeholder="URL of profile picture"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									v-model="curUser.username"
									class="form-control form-control-lg"
									type="text"
									placeholder="Your Name"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									v-model="curUser.bio"
									class="form-control form-control-lg"
									rows="8"
									placeholder="Short bio about you"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input class="form-control form-control-lg" type="text" placeholder="Email" />
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="password"
									placeholder="new Password"
								/>
							</fieldset>
							<button class="btn btn-lg btn-primary pull-xs-right" @click="updateSetting">
								Update Settings
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';
import { updateSetting } from '@/api/user';
export default {
	name: 'SettingIndex',
	middleware: 'authenticated',
	computed: {
		...mapState(['user']),
		curUser() {
			if (this.user) {
				return JSON.parse(JSON.stringify(this.user));
			} else {
				return {};
			}
		},
	},
	methods: {
		async updateSetting() {
			await updateSetting(this.curUser);
			this.$router.push({
				name: 'Profile',
				params: { username: this.curUser.username },
			});
		},
	},
};
</script>
