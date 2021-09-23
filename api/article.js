import request from '@/utils/request';

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
		headers: {
			Authorization: `Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MjIyODQ3LCJ1c2VybmFtZSI6InF3ZXJmZGFzIiwiZXhwIjoxNjM3NTA2OTcwfQ.x83lP7ME9wPYP92q8mv_-fV0W7hHP_Ef2E5iMAyR7KE`,
		},
		params,
	});
};
