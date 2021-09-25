import axios from 'axios';

const request = axios.create({
	baseURL: 'https://conduit.productionready.io',
});
// request.interceptors.request.use(
// 	function(config) {
// 		console.log(123);
// 		config.headers.Authorization = 'Token usertoken';
// 		return config;
// 	},
// 	function(err) {
// 		return Promise.reject(err);
// 	}
// );

// export default request;
