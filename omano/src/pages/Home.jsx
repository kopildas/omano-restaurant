import React, { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import Food_cover_1 from "../components/home/Food_cover_1";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "../components/home/RowContainer";
import { useStateValue } from "../context/StateProvider";
import Menu from "../components/home/Menu";
import CartContainer from "../components/home/CartContainer";
import Reservation from "../components/home/Reservation";
import Footer from "../components/home/Footer";
import FeatureFoods from "../components/home/FeatureFoods";
import Testimonials from "../components/home/Testimonials";

export default function Home() {
  /* The line `const [{foodItem},dispatch] = useStateValue();` is using the `useStateValue` hook from
  the context provider to access the `foodItem` state and the `dispatch` function. */
  const [{ foodItem, cartShow }, dispatch] = useStateValue();
  const [scrollValue, setscrollValue] = useState(0);

  useEffect(() => {}, [scrollValue, cartShow]);

  // const lunchItems = foodItem?.filter((n) => n.category === "Lunch");

  return (
    <div>
      <Hero />

      <section className="w-full mt-14 md:mt-20">
      <div className="flex flex-col items-center justify-center w-full">
          <p className="md:text-lg text-red-500">BEST FOOD MENU</p>
          <p className="relative md:text-5xl text-2xl mb-20 font-semibold capitalize before:absolute">
            Our Popular Food Items
          </p>
        </div>

        <FeatureFoods />
        
      </section>
      <section className="w-full " id="menu">
        <div className="flex flex-col items-center justify-center w-full">
          <p className="md:text-lg text-red-500">BEST FOOD FOR FAMILY</p>
          <p className="relative md:text-5xl text-4xl font-semibold capitalize before:absolute">
            Chose your best Category
          </p>

          <div className="bg-[url(')] bg-cover w-screen bg-fixed">
            <Menu scrollValue={scrollValue} flag={true} data={foodItem} />
          </div>
          <Food_cover_1 />
          <div className="mt-44 mb-44">
            <Reservation />
            
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col">
              <p className="flex items-center justify-center text-red-400 md:text-lg">
                TESTMONIAL
              </p>
              <p className="flex items-center justify-center text-xl md:text-4xl font-semibold">
                What customer say about Us
              </p>
            </div>
            <Testimonials />
          </div>

          <Footer />

          {/* cart */}
          {cartShow && <CartContainer />}
        </div>
      </section>
    </div>
  );
}
