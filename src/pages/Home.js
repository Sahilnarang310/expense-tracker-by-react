import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { useAuth } from "../store/auth-context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, profeleActions } from "../store";

const Home = () => {
  const [show, setShow] = useState(true);
  const profileState = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const authstate = useSelector((state) => state.auth);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const authCtx = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.REACT_APP_FIREBASE_API}`,
          {
            idToken: token,
          }
        );
        console.log(response);
        const { displayName, photoUrl, emailVerified } = response.data.users[0];
        dispatch(
          profeleActions.fillProfile({ displayName, photoUrl, emailVerified })
        );
        if (profileState.isCompleteProfile){
          console.log(`go user to expense tracker`);
          navigate("expense");
        }
        if (profileState.isEmailVerified) setShow(false);
      } catch (error) {
        localStorage.clear();
        dispatch(authActions.logout());
        navigate("/");
      }
    }
    fetchData();
    return;
  }, [profileState.isEmailVerified, navigate, token]);
  const verifyEmail = async () => {
    const verifyEmail = await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API}`,
      {
        idToken: localStorage.getItem("token"),
        requestType: "VERIFY_EMAIL",
      }
    );
    console.log(verifyEmail);
    setShow(false);
  };
  return (
    <>
      {!profileState.isEmailVerified && show && (
        <button onClick={verifyEmail} className="text-red-600 p-2 m-2 border border-red-500 rounded-lg">Click here to verify Email</button>
      )}
      {profileState.isShowProfile && <Profile />}
    </>
  );
};

export default Home;
