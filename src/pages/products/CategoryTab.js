import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';  
import apiClient from '../../axios-client.js';
import { triggerFocus } from 'antd/lib/input/Input.js';

export default function CategorySelect({ value, onSelect }) {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);  
    const { Option } = Select;

    const fetchCategories = async () => {
        try {
            setLoading(true);  
            const response = await apiClient.get('/category');
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
            onChange={onSelect}
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
