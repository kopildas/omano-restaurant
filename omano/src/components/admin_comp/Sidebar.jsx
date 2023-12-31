import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import {
  FaBars,
  FaCommentAlt,
  FaRegChartBar,
  FaTh,
  FaThList,
  FaUserAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

export default function Sidebar({ children }) {
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

  const auth = getAuth();
  const [{ cartShow,cartItems,user }, dispatch] = useStateValue();
  
  const navigate = useNavigate();

  function onLogOut() {
    localStorage.removeItem("user");
    console.log(auth.currentUser);

    auth
      .signOut()
      .then(() => {
        dispatch({
          type: actionType.DEL_USER,
        });
        console.log(auth.currentUser);
        console.log("sign out");
        navigate("/"); // Navigate to "/" after successful sign out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }
  

  return (
    <div className="flex sticky z-40">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`${
          isOpen ? "w-40" : "w-12"
        } bg-black scroll-none text-white transition-all duration-500 flex-shrink-0`}
      >
        <div className="top_section">
          {/* <h1
            style={{ display: isOpen ? "block" : "none" }}
            className="logoo text-xl"
          >
            Logo
          </h1> */}
          <div className="bars md:hidden">
            <FaBars onClick={toggle} className="text-3xl flex right-2" />
          </div>
        </div>
        <div
          className="menu-items-container"
          style={{ position: "sticky", top: 0 }}
        >
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="flex sticky items-center p-4 gap-4 text-white transition-all duration-500 hover:bg-lightBlue-100 hover:text-white"
              activeClassName="active"
              end={true}
            >
              <div className="text-xl">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
                onClick={()=> item.name === "Logout" && onLogOut(item.name)}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
