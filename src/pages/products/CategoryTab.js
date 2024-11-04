import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import apiClient from '../../axios-client.js';

export default function CategorySelect({ onSelect }) {

    const [categories ,setCategories] = useState([]);

    const { Option } = Select;

    const fetchCategories = async () => {
        try{
            const response = await apiClient.get('/category');
            const data = response.data.data.map( cate => { return cate.object });
            const mergeddata = data.flat() //i use this to merge an array from backdend
            setCategories(mergeddata);
        }catch(err){
            console.log(err.message);
        }
    }


    useEffect(()=>{
        fetchCategories();
    },[]);

   return(
        <Select
            placeholder="-- Select Category --"
            onChange={onSelect} 
        >
            {categories.map((attr) => (
                <Option key={attr.id} value={attr.id}>
                    {attr.label}
                </Option>
            ))}
        </Select>
    );
};
