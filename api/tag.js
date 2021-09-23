import request from '@/utils/request';

// get public article list
export const getTags = (params) => {
	return request({
		method: 'GET',
		url: '/api/tags',
		params,
	});
};
