import React from 'react'
import {  useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate()
  function ChangePage (){
    navigate("/foods")
  }
  return (
    <>
      <div className="home md:home2">
        <div className="grid h-full grid-flow-col">
            <div className="flex flex-col items-center md:items-start justify-center px-10 md:mt-10 mt-14 mb-16 md:px-52">
            <p className="text-[1rem] font-mono tracking-wide">Welcome to Omano</p>
            <p className="text-[2.1rem] md:text-[3rem] font-bold tracking-wide">ENJOY YOUR</p>
            <p className="text-[2rem] md:text-[3rem] font-bold tracking-wide">FAVORITE FOOD </p>
            <p className="text-[2rem] md:text-[3rem] font-bold tracking-wide">WITH FAMILY.</p>
            <button type="" onClick={() => {navigate("/foods")}} className="px-5 py-1 transition ease-in-out bg-red-600 rounded-md btn hover:bg-red-800 mt-5">Explore MENU</button>
            </div>
            <div >
                
            </div>
        </div>
      </div>
    </>
  )
}
