import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_REQUEST_URL,
	timeout: 5000,
	headers: {
		'Content-Type': 'application/json',
	},
});

export default axiosInstance;
