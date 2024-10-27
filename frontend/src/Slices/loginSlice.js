import { createSlice } from "@reduxjs/toolkit";

const loginSlice=createSlice({
    
    name:'product',
    initialState:{
       login:false
        
    },
    reducers:{
       
        LoginTrue(state,action){
            state.login=true
        }
        
        
    }
})


export const{LoginTrue}=loginSlice.actions;



export default loginSlice.reducer