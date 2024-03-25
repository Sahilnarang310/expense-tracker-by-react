import React from "react";
import { useAuth } from "../store/auth-context";

const Header = () => {
  const authCtx = useAuth();
  
  return (
    <div className="text-center flex justify-between p-3 bg-slate-700 text-yellow-100">
      <h2 className="text-4xl">Finance focus</h2>
      {!authCtx.isFillProfile && (
        <p className="">
          your profile is incomplate{" "}
          <button className="text-blue-400" onClick={authCtx.showProfile}>
            complete now
          </button>{" "}
        </p>
      )}
    </div>
  );
};

export default Header;
