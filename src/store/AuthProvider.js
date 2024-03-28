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
  expenses:[],
  isEmailVerified: false,
};
const reducerFxn = (state, action) => {
  if (action.type === "LOGIN") {
    return {
      ...state,
      email: action.email,
      token: action.token,
      isLogin: !!action.token,
    };
  }
  if (action.type === "PROFILE") {
    return {
      ...state,
      username: action.username,
      picUrl: action.picUrl,
      isEmailVerified: action.isEmailVerified,
      isFillProfile: !!action.username,
    };
  }
  if (action.type === "ISSHOWPROFILE") {
    return { ...state, isShowProfile: true };
  }
  if (action.type === "LOGOUT") {
    localStorage.clear();
    return defaultValues;
  }
  if (action.type === "ADD") {
    return { ...state, expenses: [...state.expenses, { ...action.expense }] };
  }
  return defaultValues;
};
const AuthProvider = (props) => {
  const [authState, dispachAuth] = useReducer(reducerFxn, defaultValues);
  const login = (email, token) => {
    dispachAuth({ type: "LOGIN", email, token });
  };
  const logout = () => {
    dispachAuth({ type: "LOGOUT", });
  };
  const addExpense = (expense) => {
    dispachAuth({ type: "ADD",expense});
  };
  const fillProfile = (username, picUrl, isEmailVerified) => {
    dispachAuth({ type: "PROFILE", username, picUrl, isEmailVerified });
  };
  const showProfile = () => {
    dispachAuth({ type: "ISSHOWPROFILE" });
  };
  return (
    <AuthContext.Provider
      value={{
        isLogin: authState.isLogin,
        email: authState.email,
        token: authState.token,
        username: authState.username,
        picUrl: authState.picUrl,
        expenses: authState.expenses,
        isFillProfile: authState.isFillProfile,
        isShowProfile: authState.isShowProfile,
        isEmailVerified: authState.isEmailVerified,
        fillProfile,
        login,
        logout,
        showProfile,
        addExpense,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
