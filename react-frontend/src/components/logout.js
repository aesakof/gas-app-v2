import React, { useEffect, useContext } from 'react';
import axiosInstance from '../axios';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';

export default function Logout() {
	const history = useHistory();
    const { setUsername } = useContext(Context)

	useEffect(() => {
		const response = axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
        localStorage.removeItem('username')
		axiosInstance.defaults.headers['Authorization'] = null;

        setUsername(null);

		history.push('/login/');
	});
	return <div>You are being logged out</div>;
}