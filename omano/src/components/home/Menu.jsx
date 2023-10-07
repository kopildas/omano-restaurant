import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { category } from "../admin_comp/Add_popup";
import RowContainer from "./RowContainer";

export default function Menu({ flag, data, scrollValue }) {
  const rowContainer = useRef();
  const [filter, setFilter] = useState("Fast Food");
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

 

  return (
    <>
      <div
        ref={rowContainer}
        className={`w-96 md:w-screen flex items-center justify-center p-14 md:p-20 gap-4 scroll-smooth  ${
          flag
            ? "overflow-x-scroll scrollbar-none"
            : "overflow-x-hidden flex-wrap"
        }`}
      >
        {category &&
          category.map((category) => (
            <div
              // key={category?.id}
              key={category?.value}

              className={`w-96 md:w-full b-red-300 flex items-center justify-center lg:justify-center scrollbar-none `}
              onClick={() => setFilter(category.value)}
            >
              <div
                className={`group ${
                  filter === category.value ? "border border-red-400 border-b-4 border-b-red-500" : "border border-gray-200"
                } md:w-28 md:h-32 w-12 h-20 cursor-pointer rounded-lg drop-shadow-xl flex flex-col items-center justify-center duration-150 transition-all ease-in-out`}
              >
                <div className="w-8 h-8 md:w-16 md:h-16">
                  <img src={category.label} className="" alt="" />
                </div>
                <p className="text text-sm md:text-lg">{category.value}</p>
              </div>
            </div>
          ))}
      </div>

      <div className="w-full">
        <RowContainer
          flag={false}
          data={data?.filter((n) => n.category === filter)}
        />
      </div>
    </>
  );
}
