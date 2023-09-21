import React from "react";
import {TiSocialFacebook,TiSocialTwitter,TiSocialPinterest,} from 'react-icons/ti'
import {SlSocialInstagram,SlSocialLinkedin} from 'react-icons/sl'
export default function Footer() {
  return (
    <div>
      <div
        className="bg-[url('../public/images/footer6.jpg')] bg-cover w-screen md:h-[400px]"
        // style={{
        //   height: "400px",
        // }}
      >
        <div className="">
          <div className="flex md:flex-row md:grid-rows-3 flex-col md:gap-20 gap-10 md:items-center md:justify-evenly items-start justify-start p-10 md:p-20">
            <div className="text-white md:w-1/5">
              <p className="text text-lg font-bold text-white mb-3 relative">
                About Us
                <span
                  className="absolute bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 h-[1px] w-1/5 bottom-0 left-[31px] md:left-[23px]"
                  style={{ transform: "translateX(-50%)" }}
                ></span>
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
                et reprehenderit odit sunt soluta impedit voluptatum quam 
                
              </p>
              <div className="flex flex-row gap-4 mt-4">
                <TiSocialFacebook className="text text-3xl hover:text-red-500 transition duration-150 ease-in-out"/>
                <TiSocialTwitter className="text text-3xl hover:text-red-500 transition duration-150 ease-in-out"/>
                <SlSocialInstagram className="text text-3xl hover:text-red-500 transition duration-150 ease-in-out"/>
                <TiSocialPinterest className="text text-3xl hover:text-red-500 transition duration-150 ease-in-out"/>
                <SlSocialLinkedin className="text text-3xl hover:text-red-500 transition duration-150 ease-in-out"/>


              </div>
            </div>

            <div className="text-white md:w-1/5">
            <p className="text text-lg font-bold text-white md:mb-3 relative">
                Best Menus
                <span
                  className="absolute bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 h-[1px] w-1/3 bottom-0 left-[23px] md:left-[24px]"
                  style={{ transform: "translateX(-50%)" }}
                ></span>
              </p>
              <div className="text-gray-400">
                <p> Biriyani</p>
                <p> Pasta</p>
                <p> Chicken Fry</p>
                <p> Fast Food</p>
                <p> Ice-Cream</p>
                <p> Drinks And Juice</p>
              </div>
            </div>
            <div className="text-white md:w-1/5">
            <p className="text text-lg font-bold text-white mb-3 relative">
                Our Availability
                <span
                  className="absolute bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 h-[1px] w-1/5 bottom-0 left-[22px] md:left-[24px]"
                  style={{ transform: "translateX(-50%)" }}
                ></span>
              </p>
              <div className="flex flex-col gap-2 mt-3 text-gray-300">
              <p>Mon-Fri 09:00AM - 09:00PM</p>
              <p>Sat 11:00AM - 09:00PM</p>
              <p>Sunday <span className=" text-red-600 font-semibold">CLOSED</span></p>
              <p>Reservation 24/7 Hours</p>
              <p className="text text-white font-semibold">Call Us: +3432345232</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
