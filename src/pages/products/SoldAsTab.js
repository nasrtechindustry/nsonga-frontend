import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const solds = [
    { value: 'carton', label: 'Carton' },
    { value: 'dozen', label: 'Dozen' },
    { value: 'pieces', label: 'Pieces' }
];

export const SoldAs = ({ value, onSelect }) => (
    <Select
        value={value} 
        placeholder="-- Select Sold Type --"
        onChange={onSelect} 
        showSearch
    >
        {solds.map((attr) => (
            <Option key={attr.value} value={attr.value}>
                {attr.label}
            </Option>
        ))}
    </Select>
);
