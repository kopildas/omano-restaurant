import React, { useEffect } from "react";
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


useEffect(() => {

  console.log(user);
//   if (user && user.email === "kopildas451@gmail.com") {
    
//     return <Outlet />;
  
// } else {
//   return <Home />;
// }

}, [user])

  
  const { loggedIn, checkingStatus, idd } = useAuthStatus();
  if (checkingStatus) {
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
  if (user && user.email === "testadmin01@gmail.com") {
    return <Outlet />;
  
} else {
  return <Home />;
}


}
