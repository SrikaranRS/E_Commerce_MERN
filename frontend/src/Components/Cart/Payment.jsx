import React, { useEffect } from "react";
import Stepper from "./Stepper";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {

/*   const stripe=useStripe();
  const elements=useElements()
  const dispatch=useDispatch()
  const navigate=useNavigate() 

  const orderInfo=JSON.parse(sessionStorage.getItem('orderInfo'))
  const {items:cartItems,shippingInfo}=useSelector(state=>state.cartState)
  const {user}=useSelector(state=>state.authState)

  

  
  const paymentData = {
    amount : Math.round( orderInfo.totalPrice * 100),
    shipping :{
        name: user.name,
        address:{
            city: shippingInfo.city,
            postal_code : shippingInfo.postalCode,
            country: shippingInfo.country,
            state: shippingInfo.state,
            line1 : shippingInfo.address
        },
        phone: shippingInfo.phoneNo
    }
}

const order={
  orderItems:cartItems,
  shippingInfo
}



if(orderInfo) {
  order.itemsPrice = orderInfo.itemsPrice
  order.shippingPrice = orderInfo.shippingPrice
  order.taxPrice = orderInfo.taxPrice
  order.totalPrice = orderInfo.totalPrice
  
}

const handleSubmit=(e)=>{
  e.preventDefault()
} */


  return (
    <div>
      <Stepper currentStep={3} />
      <h1>Payment</h1>
    </div>
  );
};

export default Payment;
