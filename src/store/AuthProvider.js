import React, { useReducer } from "react";
import AuthContext from "./auth-context";

const defaultValues = {
  isLogin: false,
  email: "",
  token: "",
  isFillProfile: false,
  isShowProfile: false,
  username: "",
  picUrl: "",
};
const reducerFxn=(state,action)=>{
    if(action.type==='LOGIN'){
        return {...state , email:action.email,token:action.token,isLogin:!!action.token}
    }
    if(action.type==='PROFILE'){
        return {...state , username:action.username,picUrl:action.picUrl, isFillProfile:!!action.username}
    }
    if (action.type === "ISSHOWPROFILE") {
      return { ...state, isShowProfile: true};
    }
    if(action.type==='LOGOUT'){
        return defaultValues;
    }
    return defaultValues;
}
const AuthProvider = (props) => {
    const [authState,dispachAuth]= useReducer(reducerFxn,defaultValues);
    const login=(email,token)=>{
        dispachAuth({type:"LOGIN",email,token});
    }
    const logout=(email,token)=>{
        dispachAuth({type:"LOGIN",email,token});
    }
    const fillProfile=(username,picUrl)=>{
        dispachAuth({type:"PROFILE",username,picUrl});
    }
    const showProfile=()=>{
        dispachAuth({type:"ISSHOWPROFILE"});
    }
  return (
    <AuthContext.Provider
      value={{
        isLogin: authState.isLogin,
        email: authState.email,
        token: authState.token,
        username: authState.username,
        picUrl: authState.picUrl,
        isFillProfile: authState.isFillProfile,
        isShowProfile: authState.isShowProfile,
        fillProfile,
        login,
        logout,
        showProfile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
