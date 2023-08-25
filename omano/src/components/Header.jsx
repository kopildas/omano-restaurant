import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Sidebar from "./admin_comp/Sidebar";
import { MdShoppingBasket } from "react-icons/md";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export default function Header({ children }) {
  const location = useLocation();
  const [{cartShow,cartItems},dispatch] = useStateValue();

  const [isCurrentRouteAdmin, setIsCurrentRouteAdmin] = useState(false);

  const navigate = useNavigate();
  function pathMatchRoute(route) {
    const vl =
      location.pathname === "/admin" || location.pathname.startsWith("/admin/");
    // setIsCurrentRouteAdmin(vl);
    console.log(vl);
    console.log("kire");
    if (route === location.pathname) {
      // setIsCurrentRouteAdmin(false)
      return true;
    }
  }

  function adminOrNot() {
    console.log(location.pathname);
    if (
      location.pathname === "/admin" ||
      location.pathname.startsWith("/admin/")
    )
      return true;
    else return false;
  }

  const [popups, setPopups] = useState({
    login: false,
    signup: false,
  });

  function togglePopup(popup) {
    setPopups((prevState) => ({
      ...prevState,
      [popup]: !prevState[popup],
    }));
  }
  const [seen, setSeen] = useState(false);

  const [pagestate, setPageState] = useState("Log in");
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.email === "kopildas451@gmail.com") {
        setPageState("Admin");
        setSeen(!seen);
      } else if (user) {
        setPageState("Profile");
        setSeen(!seen);
      } else {
        setPageState("Log in");
      }
      console.log(user);
    });
  }, [auth]);

  function togglePop() {
    setSeen(!seen);
  }
  function callsign() {
    togglePop();
    togglePopup("signup");
  }
  function calllog() {
    togglePop();
    togglePopup("login");
  }

  function cartShowing() {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow, 
    })
  }
  return (
    <>
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        {/* desktop and tablate */}
        <div className="hidden md:flex justify-between items-center px-3 max-w-6xl mx-auto">
          <div>
            <img
              src="./logo.png"
              alt="logo"
              className="h-16 cursor-pointer"
              onClick={() => {
                navigate("/");
                adminOrNot();
              }}
            />
          </div>
          <div className="flex items-center">
            <ul className="flex space-x-10">
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoute("/") && "text-black border-b-red-900"
                }`}
                onClick={() => {
                  navigate("/");
                  adminOrNot();
                }}
              >
                Home
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoute("/offer") && "text-black border-b-red-900"
                }`}
                onClick={() => {
                  navigate("/");
                  adminOrNot();
                }}
              >
                offer
              </li>
              <li
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  pathMatchRoute("/sign-up") && "text-black border-b-red-900"
                }`}
              >
                <Link to="/sign-up">Sign up</Link>
              </li>
              

              <div className="relative flex items-center justify-center gap-9" onClick={cartShowing}>
                  <MdShoppingBasket className="text-2xl text-gray-500 cursor-pointer" />
                  {cartItems && cartItems.length > 0 && (
                    <div className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <p className="text-white font-semibold text-xs">{cartItems.length}</p>
                  </div>
                  )}

                  
                </div>


                <li
                className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                  (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                  "text-black border-b-red-500"
                }`}
              >
                

                <div className="">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        calllog();
                        if (pagestate === "Profile") {
                          adminOrNot();
                          navigate("/profile");
                        } else if (pagestate === "Admin") {
                          adminOrNot();
                          navigate("/admin");
                        }
                      }}
                    >
                      {pagestate}
                    </button>
                    {popups.login && seen && pagestate === "Log in" && (
                      <Login toggle={calllog} />
                    )}
                  </div>

              </li>

            </ul>
          </div>
        </div>

        {/* for mobile */}
        <div className="flex md:hidden"></div>

        {/* {console.log(adminOrNot())} */}
      </header>
    </>
  );
}
