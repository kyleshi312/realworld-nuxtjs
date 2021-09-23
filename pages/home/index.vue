<template>
	<div class="home-page">
		<div class="banner">
			<div class="container">
				<h1 class="logo-font">conduit</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>

		<div class="container page">
			<div class="row">
				<div class="col-md-9">
					<div class="feed-toggle">
						<ul class="nav nav-pills outline-active">
							<li v-if="user" class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{
										active: tab === 'your_feed',
									}"
									exact
									:to="{
										name: 'home',
										query: {
											tab: 'your_feed',
										},
									}"
									>Your Feed</nuxt-link
								>
							</li>
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{
										active: tab === 'global_feed',
									}"
									exact
									:to="{
										name: 'home',
										query: {
											tab: 'global_feed',
										},
									}"
									>Global Feed</nuxt-link
								>
							</li>
							<li v-if="tag" class="nav-item">
								<nuxt-link
									class="nav-link active"
									:class="{
										active: tab === 'global_feed',
									}"
									exact
									:to="{
										name: 'home',
										query: {
											tab: 'global_feed',
										},
									}"
									>#{{ tag }}</nuxt-link
								>
							</li>
						</ul>
					</div>

					<div class="article-preview" v-for="article in articles" :key="article.slug">
						<div class="article-meta">
							<nuxt-link
								:to="{
									name: 'Profile',
									params: {
										username: article.author.username,
									},
								}"
							>
								<img :src="article.author.image" />
							</nuxt-link>
							<div class="info">
								<nuxt-link
									:to="{
										name: 'Profile',
										params: {
											username: article.author.username,
										},
									}"
									class="author"
									>{{ article.author.username }}</nuxt-link
								>
								<span class="date">{{ article.createdAt }}</span>
								<!-- <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span> -->
							</div>
							<button
								class="btn btn-outline-primary btn-sm pull-xs-right"
								:class="{ active: article.favorited }"
							>
								<i class="ion-heart"></i> {{ article.favoritesCount }}
							</button>
						</div>
						<nuxt-link
							href=""
							class="preview-link"
							:to="{
								name: 'Article',
								params: {
									slug: article.slug,
								},
							}"
						>
							<h1>{{ article.title }}</h1>
							<p>{{ article.body }}</p>
							<span>Read more...</span>
						</nuxt-link>
					</div>
					<nav>
						<ul class="pagination">
							<li
								class="page-item"
								:class="{
									active: item === page,
								}"
								v-for="item in totalPage"
								:key="item"
							>
								<nuxt-link
									class="page-link"
									:to="{
										name: 'home',
										query: {
											page: item,
											tag: $route.query.tag,
											tab: tab,
										},
									}"
									>{{ item }}</nuxt-link
								>
							</li>
						</ul>
					</nav>
				</div>
				<div class="col-md-3">
					<div class="sidebar">
						<p>Popular Tags</p>

						<div class="tag-list">
							<nuxt-link
								:to="{
									name: 'home',
									query: {
										tab: 'tag',
										tag,
									},
								}"
								class="tag-pill tag-default"
								v-for="tag in tags"
								:key="tag"
								>{{ tag }}</nuxt-link
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { getArticles, getArticlesFeed } from '@/api/article';
import { getTags } from '@/api/tag';
import { mapState } from 'vuex';
export default {
	name: 'HomeIndex',
	async asyncData({ query, store }) {
		const page = Number.parseInt(query.page || 1);
		const limit = 20;
		const tag = query.tag;
		const tab = query.tab || 'global_feed';
		const loadArticles = store.state.user && tab === 'your_feed' ? getArticlesFeed : getArticles;
		const [listData, tagsData] = await Promise.all([
			loadArticles({
				limit,
				offset: (page - 1) * limit,
				tag,
			}),
			getTags(),
		]);
		const { data } = listData;
		return {
			articles: data.articles || [],
			articlesCount: data.articlesCount,
			tags: tagsData.data.tags,
			limit,
			page,
			tag,
			tab,
		};
	},
	watchQuery: ['page', 'tag', 'tab'],
	computed: {
		...mapState(['user']),
		totalPage() {
			return Math.ceil(this.articlesCount / this.limit);
		},
	},
};
</script>
