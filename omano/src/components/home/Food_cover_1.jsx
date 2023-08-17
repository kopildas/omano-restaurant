import React from "react";

export default function Food_cover_1() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src="../public/images/foodCover2.jpg"
            alt="Background"
            className="w-full h-full object-cover filter"
          />
        </div>
        <div className="relative z-10 p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20 flex flex-col md:flex-row gap-4 md:gap-10 justify-center items-center bg-opacity-80 bg-black text-white">
          <div className="flex-1">
            <div className="font-bold text-xl">logo</div>
            <p className="text-lg">Fast Foods</p>
            <p>100% Natural fast foods</p>
          </div>
          <div className="flex-1">
            <div className="font-bold text-xl">logo</div>
            <p className="text-lg">Fast Foods</p>
            <p>100% Natural fast foods</p>
          </div>
          <div className="flex-1">
            <div className="font-bold text-xl">logo</div>
            <p className="text-lg">Fast Foods</p>
            <p>100% Natural fast foods</p>
          </div>
          <div className="flex-1">
            <div className="font-bold text-xl">logo</div>
            <p className="text-lg">Fast Foods</p>
            <p>100% Natural fast foods</p>
          </div>
        </div>
      </div>
    </>
  );
}
