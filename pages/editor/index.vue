<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<form>
						<fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									v-model="article.title"
									class="form-control form-control-lg"
									placeholder="Article Title"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									v-model="article.description"
									class="form-control"
									placeholder="What's this article about?"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									v-model="article.body"
									class="form-control"
									rows="8"
									placeholder="Write your article (in markdown)"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									v-model="tag"
									@keydown.enter="addTagList"
									class="form-control"
									placeholder="Enter tags"
								/>
								<div class="tag-list">
									<span
										v-for="tag in article.tagList"
										:key="tag"
										class="tag-default tag-pill ng-binding ng-scope"
									>
										<i class="ion-close-round" @click.prevent="removeTag(tag)"></i>
										{{ tag }}
									</span>
								</div>
							</fieldset>
							<button
								class="btn btn-lg pull-xs-right btn-primary"
								:disabled="btnLoading"
								@click="publishArticle"
								type="button"
							>
								Publish Article
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { publishArticle } from '@/api/editor';
import { getArticle } from '@/api/article';
import MarkdownIt from 'markdown-it';

export default {
	name: 'EditorIndex',
	middleware: 'authenticated',
	data() {
		return {
			tag: '',
			article: {
				title: '',
				description: '',
				body: '',
				tagList: [],
			},
			btnLoading: false,
		};
	},
	mounted() {
		this.getArticle();
	},
	methods: {
		async getArticle() {
			const { slug } = this.$route.query;
			if (slug) {
				const { data } = await getArticle(slug);
				const { article } = data;
				this.article = article;
			}
		},
		addTagList() {
			console.log('enter clidk');
			if (!this.tag.trim()) return;
			if (this.article.tagList.includes(this.tag)) {
				return;
			}
			this.article.tagList.push(this.tag);
			this.tag = '';
		},
		removeTag(tag) {
			const tagIdx = this.article.tagList.findIndex((n) => n === this.tag);
			this.article.tagList.splice(tagIdx, 1);
		},
		async publishArticle() {
			this.btnLoading = true;
			try {
				const res = await publishArticle(this.article);
				this.btnLoading = false;
				if (res.data.article) {
					const { slug } = res.data.article;
					this.$router.push({
						name: 'Article',
						params: { slug },
					});
				}
			} catch (e) {
				console.log(e);
				this.btnLoading = false;
				return;
			}
		},
	},
};
</script>
