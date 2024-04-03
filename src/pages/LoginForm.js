import { useState, useRef, useEffect } from "react";

import classes from "./Login.module.css";
import axios from "axios";
import { useAuth } from "../store/auth-context";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const LoginForm = () => {
  const authState=useSelector(state=>state.auth);
  const dispatch=useDispatch()
  let navigate = useNavigate();;
  const [isSign, setIsSign] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  // useEffect(()=>{
  //   const email=localStorage.getItem('email');
  //   const token=localStorage.getItem('token');
  //   if(email && token){
  //     authState.login(email,token);
  //     navigate('/home')
  //   }
  // },[])
  const emailRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();
  function cleanForm(){
    emailRef.current.value=""
    passwordRef.current.value=""
    if(!isSign)
    cpasswordRef.current.value=""
  }
  const switchForgetPageHandler = () => {
    navigate("/forget");
  };
  const switchAuthModeHandler = () => {
    setIsSign((prevState) => !prevState);
  };
  const submithandler = async (e) => {
    try {
      e.preventDefault();
      setIsSubmit(true);
      let url;
      const obj = {
        password: passwordRef.current.value,
        email: emailRef.current.value,
        returnSecureToken: true,
      };
      if (isSign) {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API}`;
      } else {
        url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API}`;
        if(passwordRef.current.value!==cpasswordRef.current.value){
          alert("password doesnot match please enter same password twice")
          cleanForm();
          setIsSubmit(false);
          return;
        }
          setIsSign(true)
      }
      const response = await axios.post(url, obj);
      console.log(response);
      const {email,idToken}=response.data;
      localStorage.setItem("token", response?.data?.idToken);
      localStorage.setItem("email", response?.data?.email);
      cleanForm()
      setIsSubmit(false);
      if(isSign){
        dispatch(authActions.login({email, idToken}));
        navigate("/home");
      }
    } catch (error) {
     console.log(error); 
     setIsSign(false)
     setIsSubmit(false)
     cleanForm();
    }
  };

  return (
    <>
    <section className={classes.auth}>
      <h1>{isSign ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submithandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>
        {!isSign && (
          <div className={classes.control}>
            <label htmlFor="cpassword">Confirm Password</label>
            <input ref={cpasswordRef} type="password" id="cpassword" required />
          </div>
        )}
        <div className={classes.actions}>
          {isSubmit ? (
            <button className={classes.toggle}>requesting sending</button>
          ) : (
            <button type="submit">{isSign ? "Login" : "Create account"}</button>
          )}
          {isSign && (
            <button
              type="button"
              onClick={switchForgetPageHandler}
              className={` ${classes.toggle} underline`}
            >
              Forget password
            </button>
          )}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isSign ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
    </>
  );
};

export default LoginForm;
