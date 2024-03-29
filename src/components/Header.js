import React from "react";
import { useAuth } from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const authCtx = useAuth();
  const history=useNavigate()
  const logout=()=>{
    history('');
    authCtx.logout();
  }
  return (
    <div className="text-center  flex justify-between p-3 bg-slate-700 text-yellow-100">
      <h2 className="text-4xl">Finance focus</h2>
      {!authCtx.isFillProfile && (
        <p className="">
          your profile is incomplate{" "}
          <button className="text-blue-400" onClick={authCtx.showProfile}>
            complete now
          </button>{" "}
        </p>
      )}
      <button
        className="rounded p-1  m-2 bg-red-400 text-white"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
