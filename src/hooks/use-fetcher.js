import { useState, useEffect, useCallback } from 'react';
import { performGetRequest } from '../config/api';

export  function useFetch(url, options = {}) {
    const {
        params = {},
        decode = true,
        autoRefresh = false,
        accessToken = null,
        retryDelay = 3000, // Delay in ms before retrying after a 429 error
    } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastFetchTime, setLastFetchTime] = useState(0);

    const fetchData = useCallback( async () => {
        const now = Date.now();
        if (now - lastFetchTime < retryDelay) return; // Throttle requests based on retryDelay

        setLoading(true);
        setError(null);

        try {
            const response = await performGetRequest(url, accessToken, params, decode);
            setData(response);
            setLastFetchTime(now);
        } catch (err) {
            if (err.response?.status === 429) {
                // Handle rate limiting with exponential backoff or a simple retry delay
                setTimeout(fetchData, retryDelay);
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    }, [url, accessToken, params, decode, retryDelay, lastFetchTime]);

    useEffect(() => {
        if (autoRefresh) {
            fetchData();
        }
    }, [url, autoRefresh, fetchData]);

    return { data, loading, error, refetch: fetchData }; 
}
