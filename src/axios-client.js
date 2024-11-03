import axios from 'axios';
import { useAuth } from './components/auth/auth';

/**
 * API connection init...
 */
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api", 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});




/**
 * on sending request
 */

// This returns a promise
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('nsonga-auth-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request error
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        try {
            const { response } = err;
            // const auth = useAuth();

            if (response) {
                if (response.status === 401) {
                    // Handle unauthorized access
                    localStorage.removeItem('nsonga-auth-token');

                    console.error('Unauthorized');

                    window.location.replace('/sign-in');


                } else if (response.status === 403) {

                    console.error('Forbidden access');

                } else {

                    console.error('An error occurred:', response.data);

                }
            } else {

                console.error('Network error or server not responding:', err);

            }
        } catch (e) {

            console.error('Error handling response:', e);

        }
        
        // return Promise.reject(err); 
    }
);

export default apiClient;