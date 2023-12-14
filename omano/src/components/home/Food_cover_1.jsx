import React from "react";

export default function Food_cover_1() {
  return (
    <>
      <div className="relative mt-28 flex flex-col items-center justify-center w-full">
        <p className="text text-4xl font-semibold">WHY CHOOSE US</p>
        <p className="text text-2xl ">Discover art of good Food with US</p>

        <div className="absolute inset-0 z-0">
          
        </div>
        <div className="relative z-10 p-4 md:p-8 lg:p-12 xl:p-16 2xl:p-20 flex flex-col md:flex-row gap-4 md:gap-32 justify-center items-center bg-opacity-80 text-white">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="font-bold text-sm ">
              <img src="https://i.ibb.co/s3wfxPh/food-delivery.gif" alt="" className="w-40 h-40 rounded-full"/>
            </div>
            <p className="text-2xl text-black font-bold">Quality Foods</p>
            <div className="flex flex-col items-center justify-center text-lg text-gray-500">
            <p>we are dedicate to make</p>
            <p>and serve good and quality foods</p>
            <p> for our prestigious customer</p>
          </div>
          </div>
          
          
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="font-bold text-sm ">
              <img src="https://i.ibb.co/6ND8SLF/table.gif" alt="" className="w-40 h-40 rounded-full"/>
            </div>
            <p className="text-2xl text-black font-bold">Table Reservation</p>
            <div className="flex flex-col items-center justify-center text-lg text-gray-500">
            <p>Guarantee your spot and</p>
            <p> enjoy a hassle free dining</p>
            <p>experience with our service.</p>
          </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="font-bold text-sm ">
              <img src="https://i.ibb.co/KL0Tnsv/scooter.gif" alt="" className="w-40 h-40 rounded-full"/>
            </div>
            <p className="text-2xl text-black font-bold">Online Order</p>
            <div className="flex flex-col items-center justify-center text-lg text-gray-500">
            <p>Order online and savor</p>
            <p> the delicious flavors from the</p>
            <p> the delicious fsdf</p>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
