import axios from 'axios';


/**
 * API connection init...
 */
const apiClient =  axios.create({
    baseURL: "http://localhost:8000/api",
    headers:{
        'Content-Type' :'application/json'
    }
});


/**
 * on sending request
 */

// this return a promise
apiClient.interceptors.request.use(

    //on resolve
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },

    //on reject
    (err) => {
        return Promise.reject(err);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) =>{
        console.error('API FAILED' , err);
        return Promise.reject(err);
    }
)

export default apiClient;