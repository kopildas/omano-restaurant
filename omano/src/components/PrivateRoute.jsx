import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Login from "./Login";
import Spinner from "./Spinner";
import Admin from "../pages/Admin/Admin";
import { initialState } from "../context/initialState";
import Profile from "../pages/Profile";
import { useStateValue } from "../context/StateProvider";

export default function PrivateRoute() {
  const [{ user }, dispatch] = useStateValue();
  console.log(user);
  const [useremail, setUseremail] = useState(null);
  const { loggedIn, checkingStatus, idd } = useAuthStatus();
 
 
  useEffect(()=> {
   if(user)
   {
    setUseremail(user.email)
   }
  },[user])
 
 


  if (checkingStatus || !useremail) {
    return <Spinner />;
  }


 
  // return loggedIn ? <Outlet /> : <Navigate to = "/sign-up" />;

  
  if (loggedIn && useremail) {
    if (useremail === "testadmin01@gmail.com") {
      return <Admin />;
    } else {
      return <Profile />;
    }
  } else {
    return <Login />;
  }
  // return loggedIn ? <Outlet /> : <Login/>;
}
