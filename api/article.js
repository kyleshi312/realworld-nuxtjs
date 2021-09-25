import { request } from '@/plugins/request';

// get public article list
export const getArticles = (params) => {
	return request({
		method: 'GET',
		url: '/api/articles',
		params,
	});
};
// get feed article list
//  focused articles by user
export const getArticlesFeed = (params) => {
	return request({
		method: 'GET',
		url: '/api/articles/feed',
		params,
	});
};

// 添加点赞
export const addFavorite = (slug) => {
	return request({
		method: 'POST',
		url: `/api/articles/${slug}/favorite`,
	});
};

// 取消点赞
export const deleteFavorite = (slug) => {
	return request({
		method: 'DELETE',
		url: `/api/articles/${slug}/favorite`,
	});
};
