import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isLoginMode:true,
    isLogin:false,
    email:'',
    token:'',
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        toggleLoginMode(state){
            state.isLoginMode=!state.isLoginMode;
        },
        login(state,action){
            state.email=action.payload.email;
            state.token=action.payload.idToken;
            state.isLogin=!!action.payload.idToken;
        },
        logout(state){
            state.email='';
            state.token='';
            state.isLogin=false;
        }
    }
})

export default authSlice;