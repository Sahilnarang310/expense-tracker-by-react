import React from "react";
import Header from "../components/Header";
import Body from "./Body";
import Profile from "./Profile";
import { useAuth } from "../store/auth-context";

const Home = () => {
  const authCtx=useAuth()
  return <>{authCtx.isShowProfile && <Profile />}</>;
};

export default Home;
