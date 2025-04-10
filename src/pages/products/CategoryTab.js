import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';  
import apiClient from '../../axios-client.js';




export default function CategorySelect({ value, onChange }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);  
    const { Option } = Select;

    const fetchCategories = async () => {
        try {
            setLoading(true);  
            const response = await apiClient.get(`${process.env.REACT_APP_API_BASE_URL}/category`);
            const data = response.data.data.map(cate => cate.object);
            const mergeddata = data.flat();  
            setCategories(mergeddata);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);  
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Select
            value={value}
            placeholder="-- Select Category --"
            onChange={onChange}
            loading={loading}  
            showSearch 
        >
            {loading ? (
                <Option disabled>
                    <Spin size="small" /> Loading...
                </Option>
            ) : (
                categories.map((attr) => (
                    <Option key={attr.id} value={attr.id}>
                        {attr.label}
                    </Option>
                ))
            )}
        </Select>
    );
}
