import React, { useState } from "react";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

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
  ];
  return (
    <div className="flex h-screen">
      <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`${
          isOpen ? "w-40" : "w-12"
        } bg-black text-white transition-all duration-500 flex-shrink-0`}
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
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="flex items-center p-4 gap-4 text-white transition-all duration-500 hover:bg-lightBlue-500 hover:text-black"
            activeClassName="active"
            end={true}
          >
            <div className="text-xl">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      
    </div>
  );
}


