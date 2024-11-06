import React, { useEffect, useState } from 'react';
import { Select, Spin } from 'antd';  
import apiClient from '../../axios-client.js';

export default function AttribSelect({ value, onChange }) {

    const [attrib, setAttrib] = useState([]);
    const [loading, setLoading] = useState(true);  

    const { Option } = Select;

    const fetchAttrib = async () => {
        try {
            setLoading(true);  
            const response = await apiClient.get('/attributes');
            const data = response.data.data.map(attr => attr.object);
            const mergeddata = data.flat();  
            setAttrib(mergeddata);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        fetchAttrib();
    }, []);

    return (
        <Select
            value={value}  
            placeholder="-- Select Attribute --"
            onChange={onChange}
            loading={loading}  
            showSearch  
        >
            {loading ? (
                <Option disabled>
                    <Spin size="small" /> Loading...
                </Option>
            ) : (
                attrib.map((attr) => (
                    <Option key={attr.id} value={attr.id}>
                        {attr.label}
                    </Option>
                ))
            )}
        </Select>
    );
}
