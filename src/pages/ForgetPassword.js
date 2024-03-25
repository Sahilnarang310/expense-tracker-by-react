import React, { useRef } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPassword =  (props) => {
  const emailRef = useRef();
  const navigate = useNavigate();
  const switchLoginPageHandler = () => {
    navigate("/");
  };
  const submithandler = async (e) => {
    try {
      e.preventDefault();
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${process.env.REACT_APP_FIREBASE_API}`;
      const obj = {
        email: emailRef.current.value,
        requestType: "PASSWORD_RESET",
      };
      const response = await axios.post(url, obj);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className={classes.auth}>
      <h1></h1>
      <form onSubmit={submithandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>
        <div className={classes.actions}>
          <button type="submit">Send Link</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchLoginPageHandler}
          >
            Login with existing account
          </button>
        </div>
      </form>
    </section>
  );
};

export default ForgetPassword;
