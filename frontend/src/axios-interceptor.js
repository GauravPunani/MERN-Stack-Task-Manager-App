import axios from 'axios';
import constants from './constants/endpoints'

// Create an instance of Axios
const authApi = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

// Function to refresh the access token
const refreshAccessToken = async () => {
    // Logic to obtain a new access token using the refresh token
    const response = await authApi.post(constants.REFRESH_TOKEN_ENDPOINT, {
        refreshtoken: localStorage.getItem('refreshToken')
    });

    console.log('response', response);

    const { accessToken } = response.data.response.data
    console.log('new access token: ', accessToken);

    // Store the new access token in the browser's local storage or any other secure storage mechanism
    localStorage.setItem('accessToken', accessToken);

    // Return the new access token
    return accessToken;
};

// Axios request interceptor
authApi.interceptors.request.use(
    (config) => {
        // Get the access token from local storage or any other storage mechanism
        const accessToken = localStorage.getItem('accessToken');

        // Add the access token to the Authorization header
        if (accessToken) {
            config.headers.authorization = `${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Axios response interceptor
authApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {

        const originalRequest = error.config;

        // Check if the response status code is 401 (unauthorized) and the original request was not a token refresh request
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Refresh the access token
                const newAccessToken = await refreshAccessToken();

                // Update the Authorization header with the new access token
                authApi.defaults.headers.common.authorization = `${newAccessToken}`;

                // Retry the original request with the new access token
                return authApi(originalRequest);
            } catch (error) {
                // Handle the error when refreshing the access token fails
                // For example, redirect the user to the login page
                console.error('Error refreshing access token:', error);
                // Redirect to login page or show an error message
            }
        }

        return Promise.reject(error);
    }
);

export default authApi;
