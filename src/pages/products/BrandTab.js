import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';  // Importing Spin for the loading indicator
import apiClient from '../../axios-client.js';

export default function BrandSelect({ value, onChange }) {

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);  // Track loading state

    const { Option } = Select;

    const fetchBrands = async () => {
        try {
            setLoading(true);  // Set loading to true before fetching
            const response = await apiClient.get(`${process.env.REACT_APP_API_BASE_URL}/brands`);
            const data = response.data.map(c_brand => c_brand.object);
            const mergeddata = data.flat();  // Merge arrays if necessary
            setBrands(mergeddata);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);  // Set loading to false once the fetch is done
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    return (
        <Select
            value={value}
            placeholder="-- Select Brand --"
            onChange={onChange}
            showSearch  // Optional: allows searching through the options
            loading={loading}  // Antd's built-in loading prop to show the spinner
        >
            {loading ? (  // If loading, show a spinner as the first option
                <Option disabled>
                    <Spin size="small" /> Loading...
                </Option>
            ) : (
                brands.map((attr) => (
                    <Option key={attr.id} value={attr.id}>
                        {attr.label}
                    </Option>
                ))
            )}
        </Select>
    );
}
