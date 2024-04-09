import React from "react";
import { useAuth } from "../store/auth-context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, profeleActions } from "../store";

const Header = () => {
  const authState=useSelector(state=>state.auth);
  const profileState=useSelector(state=>state.profile);
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/");
  };
  const profileCompleteHandler=()=>{
    dispatch(profeleActions.toggleProfilePage())
  }
  return (
    <div className="text-center  flex justify-between p-3 bg-slate-700 text-yellow-100">
      <h2 className="text-4xl">Finance focus</h2>
      {authState.isLogin && !profileState.isCompleteProfile && (
        <p className="">
          your profile is incomplate{" "}
          <button className="text-blue-400" onClick={profileCompleteHandler}>
            complete now
          </button>{" "}
        </p>
      )}
      <button
        className="rounded p-1  m-2 bg-red-400 text-white"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
