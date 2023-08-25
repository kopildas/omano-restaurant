import React, { useEffect, useState } from 'react'
import Hero from '../components/home/Hero'
import Food_cover_1 from '../components/home/Food_cover_1' 
import {motion} from "framer-motion"
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import RowContainer from '../components/home/RowContainer'
import { useStateValue } from '../context/StateProvider'
import Menu from '../components/home/Menu'
import CartContainer from '../components/home/CartContainer'

export default function Home() {

  /* The line `const [{foodItem},dispatch] = useStateValue();` is using the `useStateValue` hook from
  the context provider to access the `foodItem` state and the `dispatch` function. */
  const [{foodItem,cartShow},dispatch] = useStateValue();
  const [scrollValue, setscrollValue] = useState(0)

  useEffect(() => {
    
  }, [scrollValue,cartShow])
  
  const lunchItems = foodItem?.filter((n) => n.category === "Lunch");
console.log(foodItem);
  return (
    <div>
      <Hero/>
      <Food_cover_1/> 
      <section className="w-full my-6">
        <div className="flex items-center justify-center w-full">
          <p className="relative text-2xl font-semibold capitalize text-headingColor before:absolute before:rounded-lg before:contents before:w-32">Our fresh & healthy foods</p>
          
        </div>

        <div className="items-end justify-end hidden gap-3 pr-4 md:flex">
          <motion.div whileTap={{scale: 0.75}} className="flex items-center justify-center w-8 h-8 transition-all duration-100 ease-in-out bg-orange-300 rounded-lg cursor-pointer  hover:bg-orange-500 hover:shadow-lg" onClick={()=> setscrollValue(-200)}>
            <MdChevronLeft className="text-lg text-white"/>
          </motion.div>
          <motion.div whileTap={{scale: 0.75}} className="flex items-center justify-center w-8 h-8 transition-all duration-100 ease-in-out bg-orange-300 rounded-lg cursor-pointer  hover:bg-orange-500 hover:shadow-lg" onClick={()=> setscrollValue(200)}>
            <MdChevronRight className="text-lg text-white"/>
          </motion.div>
        </div>
        <RowContainer scrollValue={scrollValue} flag={true} data={foodItem?.filter((n) => n.category === "Lunch")}/>
      </section >
      <section className="w-full " id="menu">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="relative text-3xl font-semibold capitalize before:absolute">Our hot dishe
        </p>
      
      <Menu scrollValue={scrollValue} flag={true} data={foodItem}/>
      
      {/* cart */}
      {cartShow && (<CartContainer/>)}

      </div>
    </section>
    </div>
  )
}
