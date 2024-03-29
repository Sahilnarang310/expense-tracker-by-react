import React, { useReducer } from "react";
import AuthContext from "./auth-context";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  isLogin: false,
  email: "",
  token: "",
  isFillProfile: false,
  isShowProfile: false,
  username: "",
  picUrl: "",
  expenses: [],
  isEmailVerified: false,
  isEdit: false,
  editExpenseForm: {},
  isFormVisible: false,
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
  if (action.type === "ISFORMVISIBLE") {
    return { ...state, isFormVisible:!state.isFormVisible };
  }
  if (action.type === "EDIT") {
    return {
      ...state,
      editExpenseForm: { ...action.expense },
      isEdit: true,
      isFormVisible: true,
    };
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
  const editExpense = (expense) => {
    dispachAuth({ type: "EDIT",expense});
  };
  const fillProfile = (username, picUrl, isEmailVerified) => {
    dispachAuth({ type: "PROFILE", username, picUrl, isEmailVerified });
  };
  const showProfile = () => {
    dispachAuth({ type: "ISSHOWPROFILE" });
  };
  const setIsFormVisible = () => {
    dispachAuth({ type: "ISFORMVISIBLE" });
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
        isEdit: authState.isEdit,
        editExpenseForm: authState.editExpenseForm,
        isFormVisible:authState.isFormVisible,
        fillProfile,
        login,
        logout,
        showProfile,
        addExpense,
        editExpense,
        setIsFormVisible,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
