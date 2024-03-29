import React from "react";
import Header from "./Header";
import { useAuth } from "../store/auth-context";
import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const authCtx = useAuth();
  const navigate=useNavigate();
  const loginPageHandler = () => {
    navigate("/");
    authCtx.isLogin = false;
  };
  return (
    <>
      {authCtx.isLogin ? (
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
