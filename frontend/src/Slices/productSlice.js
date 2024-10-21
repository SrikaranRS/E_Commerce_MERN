import { createSlice } from "@reduxjs/toolkit";

const productSlice=createSlice({
    
    name:'product',
    initialState:{
        loading:false,
        product:{},
        error: null
        
    },
    reducers:{

        productRequest(state,action){

            state.loading=true

        },
        productSuccess(state,action){
            state.loading=false
            state.product=action.payload.product
        },
        productFailure(state,action){
            state.loading=false;
            state.error=action.payload
        }
        
        
    }
})


export const{productRequest,productSuccess,productFailure}=productSlice.actions;



export default productSlice.reducer