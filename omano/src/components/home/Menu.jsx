import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { category } from "../admin_comp/Add_popup";
import RowContainer from "./RowContainer";

export default function Menu({ flag, data, scrollValue }) {
  console.log(data);
  const rowContainer = useRef();
  const [filter, setFilter] = useState("Lunch");
  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  console.log(category);

  return (
    <>
      <div
        ref={rowContainer}
        className={`w-full flex items-center my-12 gap-7 p-5 scroll-smooth ${
          flag
            ? "overflow-x-scroll scrollbar-none"
            : "overflow-x-hidden flex-wrap"
        }`}
      >
        {category &&
          category.map((category) => (
            <div
              key={category?.id}
              className={`w-full  flex justify-start lg:justify-center gap-3 py-6 scrollbar-none`}
              onClick={() => setFilter(category.value)}
            >
              <div
                className={`group ${
                  filter === category.value ? "bg-red-500" : "bg-slate-300"
                } w-20 min-w[84px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out`}
              >
                <div className="w-16 h-16 text-sm text">
                  <img src={category.label} className="" alt="" />
                </div>
                <p>{category.value}</p>
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
