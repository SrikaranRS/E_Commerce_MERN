import { productFailure, productSuccess } from "../Slices/productSlice";
import { productsFailure, productsRequest, productsSuccess } from "../Slices/productsSlice";
import axios from 'axios';

export const getProducts = (keyword,price, page,category) => async (dispatch) => {
    dispatch(productsRequest());

    let link = `http://localhost:5010/api/v1/product?page=${page}`;
    if (keyword) {
        link += `&keyword=${keyword}`;
    }

    if(price) {
        link += `&price[gte]=${price[0]}&price[lte]=${price[1]}`
    }

    if(category) {
        link += `&category=${category}`
    }

    try {
        const response = await axios.get(link);
        dispatch(productsSuccess(response.data));
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred while fetching products';
        dispatch(productsFailure(errorMessage));
        console.error("Error fetching products:", error);
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