import axios from "axios";
import AsyncStorageService from "../services/storage/AsyncStorageService";
import qs from 'qs';
import { REACT_APP_API_CLIENT_ID, REACT_APP_API_CLIENT_SECRET, REACT_APP_IDN_BASE_URL, REACT_APP_API_BASE_URL} from '../../global'

// LocalstorageService
const asyncStorageService = AsyncStorageService.getService();

const centralApiInstance = axios.create({
    baseURL: REACT_APP_API_BASE_URL
});

// instance.interceptors.request...
// Add a request interceptor
centralApiInstance.interceptors.request.use(
    config => {
        const token = asyncStorageService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });



//Add a response interceptor

centralApiInstance.interceptors.response.use((response) => {
    return response
}, function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && originalRequest.url ===
        REACT_APP_IDN_BASE_URL + 'connect/token') {
        //Redirect to login page
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = asyncStorageService.getRefreshToken();

        const axiosConfig = {
            baseURL: REACT_APP_IDN_BASE_URL,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        const requestData = {
            client_id: REACT_APP_API_CLIENT_ID,
            client_secret: REACT_APP_API_CLIENT_SECRET,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        };

        return axios.post('connect/token', qs.stringify(requestData), axiosConfig)
            .then(res => {
                if (res.status === 201 || res.status === 200) {
                    asyncStorageService.setToken(res.data);
                    centralApiInstance.defaults.headers.common['Authorization'] = 'Bearer ' + asyncStorageService.getAccessToken();
                    return centralApiInstance(originalRequest);
                }
            });
    }
    return Promise.reject(error);
});

export default centralApiInstance;
