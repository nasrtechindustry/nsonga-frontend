import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import apiClient from '../../axios-client.js';

export default function AttribSelect({ onSelect }) {

    const [attrib ,setAttrib] = useState([]);

    const { Option } = Select;

    const fetchAttrib = async () => {
        try{
            const response = await apiClient.get('/attributes');
            const data = response.data.data.map( attr => { return attr.object });
            const mergeddata = data.flat() //i use this to merge an array from backdend
            setAttrib(mergeddata);
        }catch(err){
            console.log(err.message);
        }
    }


    useEffect(()=>{
        fetchAttrib();
    },[]);

   return(
        <Select
            placeholder="-- Select Attribute --"
            onChange={onSelect} 
        >
            {attrib.map((attr) => (
                <Option key={attr.id} value={attr.id}>
                    {attr.label}
                </Option>
            ))}
        </Select>
    );
};
