import React, { useState } from "react";
import Sidebar from "../../components/admin_comp/Sidebar";
import { MdOutlineAttachMoney, MdOutlineFoodBank } from "react-icons/md";
import OrderSummary from "../../components/admin_comp/OrderSummary";
import Revenu from "../../components/admin_comp/Revenu";

// import { category } from "../../admin_comp/Add_popup";
export default function Admin() {


  

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow bg-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
        <div className="bg-gray-100 p-2">
          {/* Add more content here */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-6 ">
            <div className="flex gap-10 bg-green-300 flex-1 px-6 py-6 m-4 rounded-md">
              <div className="text-5xl py-4 bg-slate-200 max-w-full rounded-full">
                <MdOutlineFoodBank />
              </div>
              <div className="text text-lg">
                <p>
                  <span className="grid grid-flow-row items-center  text-4xl">
                    90
                  </span>{" "}
                  TOTAL MENUS
                </p>
              </div>
            </div>

            <div className="flex gap-10 bg-green-300 flex-1 px-6 py-6 m-4 rounded-md">
              <div className="text-6xl py-4 bg-slate-200 rounded-full">
                <MdOutlineAttachMoney />
              </div>
              <div className="text text-lg">
                <p>
                  <span className="grid grid-flow-row items-center  text-4xl">
                    90
                  </span>{" "}
                  TOTAL REVENUE
                </p>
              </div>
            </div>

            <div className="flex gap-10 bg-green-300 flex-1 px-6 py-6 m-4 rounded-md">
              <div className="text-6xl py-4">
                <MdOutlineFoodBank />
              </div>
              <div className="text text-lg">
                <p>
                  <span className="grid grid-flow-row items-center  text-4xl">
                    90
                  </span>{" "}
                  TOTAL ORDERS
                </p>
              </div>
            </div>

            <div className="flex gap-10 bg-green-300 flex-1 px-6 py-6 m-4 rounded-md">
              <div className="text-6xl py-4">
                <MdOutlineFoodBank />
              </div>
              <div className="text text-lg">
                <p>
                  <span className="grid grid-flow-row items-center  text-4xl">
                    90
                  </span>{" "}
                  TOTAL CLIENT
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
            <OrderSummary/>

            <Revenu />
          </div>
        </div>
      </div>
    </div>
  );
}
