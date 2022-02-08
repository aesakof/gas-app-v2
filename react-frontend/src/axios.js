import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		'Authorization': localStorage.getItem('access_token') ?
			'Bearer ' + localStorage.getItem('access_token') :
			null,
		'Content-Type': 'application/json',
		'accept': 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;

		if (typeof error.response === 'undefined') {
			alert(
				'A server/network error occurred. ' +
				'Looks like CORS might be the problem. ' +
				'Sorry about this - we will get it fixed shortly.'
			);
			return Promise.reject(error);
		}

        if (error.response.status === 404 || error.response.status === 403) {
            window.location.href = '/not'
        }

        if (
            error.response.status === 401 &&
            error.response.data.detail === 'Authentication credentials were not provided.'
        ) {
            console.log('You are not logged in. Redirecting...');
            window.location.href = '/login/';
            return Promise.reject(error);
        }

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			window.location.href = '/login/';
			return Promise.reject(error);
		}

        if (
            error.response.status === 401 &&
            error.response.data.code === 'token_not_valid' &&
            error.response.data.detail === 'Token is invalid or expired'
        ) {
            console.log('Refresh token expired');
            window.location.href = '/login/';
            return Promise.reject(error);
        }

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			const refreshToken = localStorage.getItem('refresh_token');

			if (refreshToken) {
                return axiosInstance
                    .post('/token/refresh/', {
                        refresh: refreshToken
                    })
                    .then((response) => {
                        localStorage.setItem('access_token', response.data.access);
                        localStorage.setItem('refresh_token', response.data.refresh);

                        axiosInstance.defaults.headers['Authorization'] =
                            'Bearer ' + response.data.access;
                        originalRequest.headers['Authorization'] =
                            'Bearer ' + response.data.access;

                        return axiosInstance(originalRequest);
                    })
                    .catch((err) => {
                        console.log(err);
                        window.location.href = '/login/';
                    });
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login/';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);

export default axiosInstance;