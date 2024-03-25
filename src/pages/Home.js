import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { useAuth } from "../store/auth-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [show,setShow]=useState(true);
  const token=localStorage.getItem('token');
  const history=useNavigate()
  const authCtx=useAuth();
  
  useEffect(() => {
    async function fetchData() {
      if(!token) {
        history('/')
      }
      else{
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API}`,
        {
          idToken:token,
        }
      );
      console.log(response);
      const {displayName,photoUrl,emailVerified}=response.data.users[0];
      authCtx.fillProfile(displayName,photoUrl,emailVerified)
      if (authCtx.isFillProfile) authCtx.showProfile();
      if(authCtx.isEmailVerified) setShow(false);
      }
    }
    fetchData();
    return;
  }, [authCtx.isEmailVerified,history,token]);
  const verifyEmail=async()=>{
    const verifyEmail = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API}`,
      {
        idToken: localStorage.getItem("token"),
        requestType: "VERIFY_EMAIL",
      },
    );
    console.log(verifyEmail);
    setShow(false);
  }
  return <>{!authCtx.isEmailVerified && show && <button onClick={verifyEmail} >Click here to verify Email</button>}
  {authCtx.isShowProfile && !show && <Profile />}</>;
};

export default Home;
