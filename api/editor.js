import { request } from '@/plugins/request';

// user login
export const publishArticle = (data) => {
	return request({
		method: 'POST',
		url: '/api/articles',
		data: {
			article: data,
		},
	});
};
