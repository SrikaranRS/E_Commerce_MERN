import { createSlice } from "@reduxjs/toolkit";

const productsSlice=createSlice({
    
    name:'products',
    initialState:{
        loading:false,
        products:[],
        error: null
        
    },
    reducers:{

        productsRequest(state,action){

            state.loading=true

        },
        productsSuccess(state,action){
            state.loading=false
            state.products=action.payload.products
            state.totalCount=action.payload.count
            state.resPerPage=action.payload.resPerPage
        },
        productsFailure(state,action){
            state.loading=false;
            state.error=action.payload
        }
        
        
    }
})


export const{productsRequest,productsSuccess,productsFailure}=productsSlice.actions;



export default productsSlice.reducer