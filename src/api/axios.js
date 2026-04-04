import axios from 'axios';

const API = axios.create({
    baseURL: 'https://interior-fullstack-production.up.railway.app/api'
});

const PUBLIC_URLS = ['/designs/', '/designs'];

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const requestUrl = originalRequest?.url || '';
        const isPublicRoute = PUBLIC_URLS.some((url) => requestUrl.includes(url));

        if (isPublicRoute) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refresh = localStorage.getItem('refresh_token');
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/users/login/refresh/`, {
                    refresh,
                });
                localStorage.setItem('access_token', res.data.access);
                originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
                return axios(originalRequest);
            } catch (err) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('username');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default API;