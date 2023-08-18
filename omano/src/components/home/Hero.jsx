import React from 'react'
import {  useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate()
  function ChangePage (){
    navigate("/foods")
  }
  return (
    <>
      <div className="home">
        <div className="grid h-full grid-flow-col">
            <div className="flex flex-col items-start justify-center mb-16 md:px-52">
            <p className="text-[1rem] font-mono tracking-wide">Welcome to Omano</p>
            <p className="text-[3rem] font-bold tracking-wide">ENJOY YOUR <br/>FAVORITE FOOD <br/> WITH FAMILY.</p>
            <button type="" onClick={() => {navigate("/foods")}} className="px-5 py-1 transition ease-in-out bg-red-600 rounded-md btn hover:bg-red-800">Explore MENU</button>
            </div>
            <div >
                
            </div>
        </div>
      </div>
    </>
  )
}
