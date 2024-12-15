import axios from 'axios';

// Create an Axios instance
export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

// Function to retrieve the stored token
export function getToken() {
    return localStorage.getItem('nsonga-auth-token') || '';
}

// Refactored pe  rformLoginRequest to store the token in local storage
export const performLoginRequest = async (payload) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axiosInstance.post('/login', payload);
        if (response.data.success) {
            const token = response.data.token;

            // Store token in local storage
            localStorage.setItem('nsonga-auth-token', token);

            return response.data;
        } else {
            throw new Error('Login failed');
        }
    } catch (error) {
        throw error;
    }
};

//post method for uploading data performMontlyPostRequest
export const performAploadPostRequest = (endURL, payload, accessToken = null) => {
    const token = accessToken || getToken();

    // Determine if payload contains a file
    const hasFile = payload instanceof FormData;

    const config = {
        headers: {
            'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    };

    return axiosInstance.post(endURL, payload, config).then((response) => {
        return response.data;
    });
};

// Generic function for POST requests
export const performPostRequest = (endURL, payload, accessToken = null) => {
    const token = accessToken || getToken();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    };

    return axiosInstance.post(endURL, payload, config).then((response) => {
        return response.data;
    });
};

// Generic function for PUT requests
export const performPutRequest = (endURL, payload, accessToken = null) => {
    const token = accessToken || getToken();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    };

    return axiosInstance.put(endURL, payload, config).then((response) => {
        return response.data;
    });
};

// Generic function for GET requests
export const performGetRequest = (endURL, accessToken = null, params = {}, decode = true) => {
    const token = accessToken || getToken();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        params,
    };

    return axiosInstance.get(endURL, config)
        .then((response) => {
            if (!decode || response.data.success) {
                return response.data;
            } else {
                throw new Error('Request failed');
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                // logout();
            }
            throw error;
        });
};

// Generic function for DELETE requests
export const performDeleteRequest = (endURL, accessToken = null) => {
    const token = accessToken || getToken();
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    };

    return axiosInstance.delete(endURL, config)
        .then((response) => {
            if (response.data.success) {
                return response.data;
            } else {
                // throw new Error('Delete request failed');
                throw new Error(response.data.message || 'Delete request failed');
            }
        })
        .catch((error) => {
            if (error.response && error.response.status === 401) {
                // logout();
            }
            throw error;
        });
};
