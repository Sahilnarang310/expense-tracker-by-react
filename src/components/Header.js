import React from "react";
import { useAuth } from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authCtx = useAuth();
  const navigate=useNavigate()
  const logoutHandler = () => {
    navigate("");
    authCtx.logout();
  };
  const loginPageHandler = () => {
    navigate('');
    authCtx.isLogin=false;
  };
  return (
    <div className="text-center  flex justify-between p-3 bg-slate-700 text-yellow-100">
      <h2 className="text-4xl">Finance focus</h2>
      {authCtx.isLogin && !authCtx.isFillProfile && (
        <p className="">
          your profile is incomplate{" "}
          <button className="text-blue-400" onClick={authCtx.showProfile}>
            complete now
          </button>{" "}
        </p>
      )}
      {authCtx.isLogin ? (
        <button
          className="rounded p-1  m-2 bg-red-400 text-white"
          onClick={logoutHandler}
        >
          Logout
        </button>
      ) : (
        <button
          className="rounded p-1  m-2 bg-red-400 text-white"
          onClick={loginPageHandler}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
