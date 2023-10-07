import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Login from "./Login";
import Spinner from "./Spinner";
import Admin from "../pages/Admin/Admin";
import { initialState } from "../context/initialState";
import Profile from "../pages/Profile";

export default function PrivateRoute() {
  const { loggedIn, checkingStatus, idd } = useAuthStatus();
  if (checkingStatus) {
    return <Spinner />;
  }


 
  // return loggedIn ? <Outlet /> : <Navigate to = "/sign-up" />;

  
  if (loggedIn) {
    if (idd === "kopildas451@gmail.com") {
      console.log(idd);
      return <Admin />;
    } else {
      console.log(idd);
      return <Profile />;
    }
  } else {
    return <Login />;
  }
  // return loggedIn ? <Outlet /> : <Login/>;
}
