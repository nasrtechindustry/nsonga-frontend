import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import apiClient from '../../axios-client.js';

export default function BrandSelect({ onSelect }) {

    const [brands ,setBrands] = useState([]);

    const { Option } = Select;

    const fetchBrands = async () => {
        try{
            const response = await apiClient.get('/brands');
            const data = response.data.map( c_brand => { return c_brand.object });
            const mergeddata = data.flat() //i use this to merge an array from backdend
            setBrands(mergeddata);
        }catch(err){
            console.log(err.message);
        }
    }


    useEffect(()=>{
        fetchBrands();
    },[]);

   return(
        <Select
            placeholder="-- Select Brand --"
            onChange={onSelect} 
        >
            {brands.map((attr) => (
                <Option key={attr.id} value={attr.id}>
                    {attr.label}
                </Option>
            ))}
        </Select>
    );
};
