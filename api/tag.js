import { request } from '@/plugins/request';

// get public article list
export const getTags = (params) => {
	return request({
		method: 'GET',
		url: '/api/tags',
		params,
	});
};
