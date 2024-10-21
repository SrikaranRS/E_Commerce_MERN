import { productFailure, productSuccess } from "../Slices/productSlice";
import { productsFailure, productsRequest, productsSuccess } from "../Slices/productsSlice";
import axios from 'axios';

export const getProducts = ()=>async (dispatch) => {
    dispatch(productsRequest());
    try {
        const response = await axios.get('http://localhost:5010/api/v1/product');
        setInterval(()=>{
            dispatch(productsSuccess(response.data));
        },1000)
      
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching products';
        dispatch(productsFailure(errorMessage));
    }
};


export const getProduct=(id)=>async (dispatch)=>{
    dispatch(productFailure)

    try {
        const response = await axios.get(`http://localhost:5010/api/v1/product/${id}`);
      /*   setInterval(()=>{
        },1000) */
        
        dispatch(productSuccess(response.data));
      
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching products';
        dispatch(productFailure(errorMessage));
    }
}