import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import Login from "./Login";
import { BiLogOut } from "react-icons/bi";
import {
  FaBars,
  FaCommentAlt,
  FaRegChartBar,
  FaTh,
  FaThList,
  FaUserAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";



export default function Header({ children }) {
  const location = useLocation();
  const [{ cartShow, cartItems,user }, dispatch] = useStateValue();

  const [isCurrentRouteAdmin, setIsCurrentRouteAdmin] = useState(false);

  const navigate = useNavigate();
  function pathMatchRoute(route) {
    const vl =
      location.pathname === "/admin" || location.pathname.startsWith("/admin/");
    // setIsCurrentRouteAdmin(vl);
    
    if (route === location.pathname) {
      // setIsCurrentRouteAdmin(false)
      return true;
    }
  }

  function adminOrNot() {

    if (
      location.pathname === "/admin" ||
      location.pathname.startsWith("/admin/")
    )return true;
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

  useEffect(() => {

      if (user && user.email === "kopildas451@gmail.com") {
        setPageState("Admin");
        setSeen(!seen);
      } else if (user) {
        setPageState("Profile");
        setSeen(!seen);
      } else {
        setPageState("Log in");
      }
      // console.log(user);
      // console.log(user.email);
    
  }, [user]);

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
    });
  }


  // for mobile view only
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/admin/users",
      name: "Users",
      icon: <FaUserAlt />,
    },
    {
      path: "/admin/wallet",
      name: "Wallet",
      icon: <FaRegChartBar />,
    },
    {
      path: "/admin/review",
      name: "Review",
      icon: <FaCommentAlt />,
    },
    {
      path: "/admin/fooditems",
      name: "Food Items",
      icon: <FaThList />,
    },
    {
      path: "/",
      name: "Logout",
      icon: <BiLogOut />,
    },
  ];







  return (
    <>
      <header className="bg-white border-b shadow-sm sticky top-0 z-40">
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
                  pathMatchRoute("/sign-in") && "text-black border-b-red-900"
                }`}
              >
                <Link to="/sign-in">Sign in</Link>
              </li>

              <div
                className="relative flex items-center justify-center gap-9"
                onClick={cartShowing}
              >
                <MdShoppingBasket className="text-2xl text-gray-500 cursor-pointer" />
                {cartItems && cartItems.length > 0 && (
                  <div className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <p className="text-white font-semibold text-xs">
                      {cartItems.length}
                    </p>
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
        <div className="md:hidden flex justify-between items-center px-3 max-w-6xl mx-auto">
        <FaBars
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-gray-500 cursor-pointer"
          />
          <img
            src="./logo.png"
            alt="logo"
            className="h-16 cursor-pointer"
            onClick={() => {
              navigate("/");
              adminOrNot();
            }}
          />
          <div
                className="relative flex items-center justify-center gap-9"
                onClick={cartShowing}
              >
                <MdShoppingBasket className="md:text-2xl text-4xl text-gray-500 cursor-pointer" />
                {cartItems && cartItems.length > 0 && (
                  <div className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <p className="text-white font-semibold text-xs">
                      {cartItems.length}
                    </p>
                  </div>
                )}
              </div>
        </div>

        {isOpen && (
          <div className="md:hidden w-screen bg-black text-white">
            <ul className="text-center">
              {menuItem.map((item) => (
                <li
                  key={item.path}
                  className={`cursor-pointer py-3 text-sm font-semibold border-b ${
                    pathMatchRoute(item.path) && "text-red-500"
                  }`}
                  onClick={() => {
                    navigate(item.path);
                    setIsOpen(false);
                  }}
                >
                  {item.icon} {item.name}
                </li>
              ))}
              <li
                className={`cursor-pointer py-3 text-sm font-semibold border-b ${
                  (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                  "text-red-500"
                }`}
                onClick={() => {
                  togglePopup("login");
                  setIsOpen(false);
                }}
              >
                {pagestate}
              </li>
            </ul>
          </div>
        )}

        {/* {console.log(adminOrNot())} */}
      </header>
    </>
  );
}
