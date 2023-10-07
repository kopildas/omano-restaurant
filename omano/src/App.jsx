import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "../src/components/home/Reservation/Calender.css";
import Home from "./pages/Home";
import Foods from "./pages/Foods"
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./pages/Admin/Admin";
import FoodItems from "./pages/Admin/FoodItems";
import Reviews from "./pages/Admin/Reviews";
import Users from "./pages/Admin/Users";
import Wallet from "./pages/Admin/Wallet";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import Sidebar from "./components/admin_comp/Sidebar";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import SingleFood from "./pages/SingleFood";
import { getAuth } from "firebase/auth";
import { validateUserJWTTOken } from "./api";



function App() {

  const auth = getAuth();
  const [{foodItem},dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data)=>{
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
      foodItem:data,
      })
    })
  }

  useEffect(() => {
    fetchData();
    auth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTTOken(token).then((data) => {
            // console.log(data);
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
      }
    });
  }, []); // Close the useEffect properly
  




  return (
    <>
      <Router>
        {/* <Route path="/admin/*" element={<Sidebar />} /> */}
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/foods" element={<Foods />} />
          <Route path="/singlefood/:id" element={<SingleFood />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/admin" element={<Admin/>} /> */}
          </Route>

          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        
          {/* for admin pannel */}
          <Route path="/admin" element={<PrivateRoute />}>
            {/* <Route path="/profile" element={<Profile />} /> */}
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/admin/fooditems" element={<PrivateAdminRoute />}>
            <Route path="/admin/fooditems" element={<FoodItems />} />
          </Route>
          <Route path="/admin/review" element={<PrivateAdminRoute />}>
            <Route path="/admin/review" element={<Reviews />} />
          </Route>
          <Route path="/admin/users" element={<PrivateAdminRoute />}>
            <Route path="/admin/users" element={<Users />} />
          </Route>
          <Route path="/admin/wallet" element={<PrivateAdminRoute />}>
            <Route path="/admin/wallet" element={<Wallet />} />
          </Route>
        </Routes>
      </Router>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
