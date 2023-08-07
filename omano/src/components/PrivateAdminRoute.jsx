import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Login from "./Login";
import Spinner from "./Spinner";
import Admin from "../pages/Admin/Admin";
import { initialState } from "../context/initialState";
import Home from "../pages/Home";

export default function PrivateAdminRoute() {
  const { loggedIn, checkingStatus, idd } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }
  console.log(idd);
  console.log(initialState.user);
  const em= initialState.user.email;
  console.log(em);
  // return loggedIn ? <Outlet /> : <Navigate to = "/sign-up" />;
  if (loggedIn && em === "kopildas451@gmail.com") {
    
      return <Outlet />;
    
  } else {
    return <Home />;
  }
  // return loggedIn ? <Outlet /> : <Login/>;
}
