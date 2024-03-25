import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import Layout from "../components/Layout";
import Home from "../pages/Home";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<Layout />}>
        <Route path="" element={<Home />} />
      </Route>
    </>
  )
);
export default routes;
