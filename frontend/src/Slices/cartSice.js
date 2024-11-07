import { createSlice } from "@reduxjs/toolkit";


const cartSlice=createSlice({
    
    name:'cart',
    initialState:{
        loading:false,
        items:localStorage.getItem('cart-items')?JSON.parse(localStorage.getItem('cart-items')):[],
        error: null
        
    },
    reducers:{

        addCartRequest(state,action){

            state.loading=true

        },
        addCartSuccess(state, action) {
            const item = action.payload;
      
            const isItemExist = state.items.find((i) => i.product === item.product);
      
            if (isItemExist) {
          /*     isItemExist.quantity += item.quantity; */
          state.loading = false;
            } else {
              state.items.push(item);
            }
      
           /*  state.loading = false; */
      
            localStorage.setItem('cart-items', JSON.stringify(state.items));
          },
        },
      });
export const{addCartRequest,addCartSuccess}=cartSlice.actions;



export default cartSlice.reducer