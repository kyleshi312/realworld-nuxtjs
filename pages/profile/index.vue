<template>
	<div class="profile-page">
		<div class="user-info">
			<div class="container">
				<div class="row">
					<div class="col-xs-12 col-md-10 offset-md-1">
						<img
							:src="user.image"
							onerror="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.90sjimg.com%2Fdesign%2F00%2F67%2F59%2F63%2F58e89bea3086c.png&refer=http%3A%2F%2Fpic.90sjimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638785770&t=4faec0bff13425c5a30392272fb1f475"
							class="user-img"
						/>
						<h4>{{ user.username }}</h4>
						<p>
							{{ user.bio }}
						</p>
						<div v-if="isCurrentUser()">
							<router-link class="btn btn-sm btn-outline-secondary action-btn" :to="{ name: 'settings' }">
								<i class="ion-gear-a"></i> Edit Profile Settings
							</router-link>
						</div>
						<div v-else>
							<!-- <button
								class="btn btn-sm btn-secondary action-btn"
								v-if="profile.following"
								@click.prevent="unfollow()"
							>
								<i class="ion-plus-round"></i> &nbsp;Unfollow
								{{ profile.username }}
							</button>
							<button
								class="btn btn-sm btn-outline-secondary action-btn"
								v-if="!profile.following"
								@click.prevent="follow()"
							>
								<i class="ion-plus-round"></i> &nbsp;Follow
								{{ profile.username }}
							</button> -->
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="container">
			<div class="row">
				<div class="col-xs-12 col-md-10 offset-md-1">
					<div class="articles-toggle">
						<ul class="nav nav-pills outline-active">
							<li class="nav-item">
								<a class="nav-link active" href="">My Articles</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="">Favorited Articles</a>
							</li>
						</ul>
					</div>

					<div class="article-preview">
						<div class="article-meta">
							<a href=""><img src="http://i.imgur.com/Qr71crq.jpg"/></a>
							<div class="info">
								<a href="" class="author">Eric Simons</a>
								<span class="date">January 20th</span>
							</div>
							<button class="btn btn-outline-primary btn-sm pull-xs-right">
								<i class="ion-heart"></i> 29
							</button>
						</div>
						<a href="" class="preview-link">
							<h1>How to build webapps that scale</h1>
							<p>This is the description for the post.</p>
							<span>Read more...</span>
						</a>
					</div>

					<div class="article-preview">
						<div class="article-meta">
							<a href=""><img src="http://i.imgur.com/N4VcUeJ.jpg"/></a>
							<div class="info">
								<a href="" class="author">Albert Pai</a>
								<span class="date">January 20th</span>
							</div>
							<button class="btn btn-outline-primary btn-sm pull-xs-right">
								<i class="ion-heart"></i> 32
							</button>
						</div>
						<a href="" class="preview-link">
							<h1>The song you won't ever stop singing. No matter how hard you try.</h1>
							<p>This is the description for the post.</p>
							<span>Read more...</span>
							<ul class="tag-list">
								<li class="tag-default tag-pill tag-outline">Music</li>
								<li class="tag-default tag-pill tag-outline">Song</li>
							</ul>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex';

export default {
	name: 'profile',
	middleware: 'authenticated',
	computed: {
		...mapState(['user']),
	},
	methods: {
		isCurrentUser() {
			if (this.user.usernamee) {
				return true;
			}
			return false;
		},
		follow() {
			// if (this.isCurrentUser()) return;
			// this.$store.dispatch(FETCH_PROFILE_FOLLOW, this.$route.params);
		},
		unfollow() {
			// this.$store.dispatch(FETCH_PROFILE_UNFOLLOW, this.$route.params);
		},
	},
	watch: {
		// $route(to) {
		// 	this.$store.dispatch(FETCH_PROFILE, to.params);
		// },
	},
};
</script>
