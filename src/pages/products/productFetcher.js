import apiClient from "../../axios-client";


export const fetchAllProducts = async (setProducts , isLoading) => {

    try{
        isLoading(true);
        const response = await apiClient.get(`${process.env.REACT_APP_API_BASE_URL}/products`);
        const prodArray = response.data.data.map(prod => {return prod})
        setProducts(prodArray);
    }catch(error){
        console.log(error.message)
    }
    finally{
        isLoading(false);
    }
}