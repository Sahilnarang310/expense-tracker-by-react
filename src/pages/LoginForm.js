import { useState, useRef } from "react";

import classes from "./Login.module.css";
import axios from "axios";
import { useAuth } from "../store/auth-context";

const LoginForm = () => {
  const authCtx=useAuth()
  const [isSign, setIsSign] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const cpasswordRef = useRef();

  const switchAuthModeHandler = () => {
    setIsSign((prevState) => !prevState);
  };
  const submithandler = async (e) => {
    e.preventDefault();
    setIsSubmit(true);
    let url;
    const obj = {
      password: passwordRef.current.value,
      email: emailRef.current.value,
      returnSecureToken: true,
    };
    if (isSign) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCxu324ZjtUtZVu_vfKSLRfZHtGouSdclo";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxu324ZjtUtZVu_vfKSLRfZHtGouSdclo";
    }
    const response = await axios.post(url, obj);
    console.log(response);
    const {email,idToken}=response.data;
    localStorage.setItem("token", response?.data?.idToken);

    passwordRef.current.value = "";
    emailRef.current.value = "";
    setIsSubmit(false);
    if(isSign){
      authCtx.login(email,idToken);
    }
  };

  return (
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
            <button type="submit">
              {isSign ? "Login" : "Create account"}
            </button>
          )}
          {isSign && (
            <button type="button" className={` ${classes.toggle} underline`}>
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
  );
};

export default LoginForm;
