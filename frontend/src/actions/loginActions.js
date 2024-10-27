import { LoginTrue } from "../Slices/loginSlice"

export const loginLoad=()=>async (dispatch)=>{

    dispatch(LoginTrue())
}