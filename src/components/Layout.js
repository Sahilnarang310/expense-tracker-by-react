import React, { useEffect } from "react";
import Header from "./Header";
import { useAuth } from "../store/auth-context";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Layout = () => {
  const authState=useSelector(state=>state.auth);
  const dispatch=useDispatch()
  const navigate=useNavigate();
  useEffect(()=>{
    const email=localStorage.getItem('email');
    const idToken = localStorage.getItem("token");
    dispatch(authActions.login({ email, idToken }));
  },[])
  const loginPageHandler = () => {
    navigate("/");
    localStorage.clear();
    dispatch(authActions.logout());
  };
  return (
    <>
      {authState.isLogin ? (
        <div>
          <Header />
          <Outlet />
        </div>
      ) : (<div className="h-screen grid ">

        <button className="border border-red-500 text-red-500 rounded m-auto  block text-2xl " onClick={loginPageHandler}>Please login again</button>
      </div>
      )}
    </>
  );
};

export default Layout;
