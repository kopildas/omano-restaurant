import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    }
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
      if (user) {
        setPageState("Profile");
        setSeen(!seen);
      } else {
        setPageState("Log in");
      }
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

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="./logo.png"
            alt="logo"
            className="h-16 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-red-900"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offer") && "text-black border-b-red-900"
              }`}
              onClick={() => navigate("/")}
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
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "text-black border-b-red-500"
              }`}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  calllog();
                  navigate("/profile");
                }}
              >
                {pagestate}
              </button>
              {popups.login && seen && pagestate==="Log in" &&<Login toggle={calllog} />}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
