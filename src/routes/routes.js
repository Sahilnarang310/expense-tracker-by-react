import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import ForgetPassword from "../pages/ForgetPassword";
import Expenses from "../pages/Expenses";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginForm />} />
      <Route path="/forget" element={<ForgetPassword />} />
      <Route path="/home" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="expense" element={<Expenses />} />
      </Route>
    </>
  )
);
export default routes;
