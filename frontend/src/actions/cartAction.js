import axios from "axios"
import { addCartRequest, addCartSuccess } from "../Slices/cartSice"

export const addCart=(id,quantity)=>async dispatch=>{

    dispatch(addCartRequest())

    const response=await axios.get(`http://localhost:5010/api/v1/product/${id}`)

    dispatch(addCartSuccess({
        product:response.data.product._id,
        name: response.data.product.name,
        price: response.data.product.price,
        image: response.data.product.images[0].image,
        stock: response.data.product.stock,
        quantity
    }))



}