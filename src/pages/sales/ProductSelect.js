import { Select } from "antd";
import { useEffect, useState } from "react";
import { fetchAllProducts } from "../products/productFetcher";


export default function ProductSelect({style ,value ,onChange}){
    const { Option } = Select;
    
    const [product , setProducts] = useState([])
    const [loading , setLoading] = useState(false)


    useEffect(()=> {
        fetchAllProducts(setProducts , setLoading)
    } , [])


    return (
        
            <Select 
                showSearch
                placeholder="-- Choose product--"
                style={style}
                onChange={onChange}
                value={value}
             >

                {product && product.map( (prod ,index) => (
                    <Option key={prod.id}>
                        {prod.name.charAt(0).toUpperCase() + prod.name.slice(1).toLowerCase()}
                    </Option>
                ))}
            </Select>
    )
}