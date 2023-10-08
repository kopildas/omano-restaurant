import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import Login from "./Login";
import Spinner from "./Spinner";
import Admin from "../pages/Admin/Admin";
import { initialState } from "../context/initialState";
import Home from "../pages/Home";
import { useStateValue } from "../context/StateProvider";

export default function PrivateAdminRoute() {

  const [{user}, dispatch] = useStateValue();
  console.log(user);
  const [useremail, setUseremail] = useState(null);

  useEffect(()=> {
    if(user)
    {
     setUseremail(user.email)
    }
   },[user])

  
  const { loggedIn, checkingStatus, idd } = useAuthStatus();

  if (checkingStatus || !useremail) {
    return <Spinner />;
  }

  // return loggedIn ? <Outlet /> : <Navigate to = "/sign-up" />;
  // if (loggedIn && em === "kopildas451@gmail.com") {
    
  //     return <Outlet />;
    
  // } else {
  //   return <Home />;
  // }
  // return loggedIn ? <Outlet /> : <Login/>;

  console.log(user.email);
  if (loggedIn && useremail === "testadmin01@gmail.com") {
    return <Outlet />;
  
} else {
  return <Home />;
}


}
