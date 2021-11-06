<template>
	<div class="article-meta">
		<nuxt-link
			:to="{
				name: 'profile',
				params: {
					username: article.author.username,
				},
			}"
		>
			<img :src="article.author.image" />
		</nuxt-link>
		<div class="info">
			<nuxt-link
				class="author"
				:to="{
					name: 'profile',
					params: {
						username: article.author.username,
					},
				}"
			>
				{{ article.author.username }}
			</nuxt-link>
			<span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
		</div>
		<button
			class="btn btn-sm btn-outline-secondary"
			:class="{
				active: article.author.following,
			}"
			@click="editArticle"
		>
			<i class="ion-edit"></i>
			&nbsp; Edit Article
		</button>
		&nbsp;&nbsp;
		<button
			class="btn btn-sm btn-outline-danger"
			:class="{
				active: article.favorited,
			}"
			:disabled="btnLoading"
			@click="deleteArticle"
		>
			<i class="ion-heart"></i>
			&nbsp; Delete Article
		</button>
	</div>
</template>

<script>
import { deleteArticle } from '@/api/article';

export default {
	name: 'ArticleMeta',
	props: {
		article: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			btnLoading: false,
		};
	},
	methods: {
		editArticle() {
			this.$router.push({
				name: 'Editor',
				query: { slug: this.article.slug },
			});
		},
		async deleteArticle() {
			this.btnLoading = true;
			await deleteArticle(this.article.slug);
			this.$router.push('/');
			this.btnLoading = false;
		},
	},
};
</script>

<style></style>
