import React from "react";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import CartitemComponenet from "./CartitemComponenet";

export default function CartContainer() {
  const [{ cartShow,cartItems,user }, dispatch] = useStateValue();

  function cartShowing() {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  }
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-80 h-screen bg-gray-200 drop-shadow-md flex flex-col z-[101]"
      
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer" onClick={cartShowing}>
        <motion.div whileTap={{ scale: 0.75 }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.div>

        <p className="text-gray-600 text-lg font-semibold">Cart</p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-base text-gray-600"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>


      {cartItems && cartItems.length>0 ? (
        
      <div className="w-full h-full bg-gray-900 rounded-t-[2rem] flex flex-col">
        {/* cart section */}
        <div className="w-full h-80 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
          {/* cart items */}
          {cartItems && cartItems.map((item) => (
            <CartitemComponenet key={item.id} item={item}/>
          ))}
        </div>

        {/* cart total section */}
        <div className="w-full flex-1 bg-gray-600 rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Sub Total</p>
            <p className="text-gray-400 text-lg">$ 77</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Delivery</p>
            <p className="text-gray-400 text-lg">$ 77</p>
          </div>

          <div className="w-full border-b border-gray-600 my-2"></div>

          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Total</p>
            <p className="text-gray-400 text-lg">$ 877</p>
          </div>

          {user ? (
            <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            className="w-full rounded-full bg-gradient-to-t from-orange-400 to-orange-600 text-gray-50 my-2 hover:shadow-lg "
          >
            Check Out
          </motion.button>
          ) : (
            <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            className="w-full rounded-full bg-gradient-to-t from-orange-400 to-orange-600 text-gray-50 my-2 hover:shadow-lg "
          >
            Login to Check Out
          </motion.button>
          )}
        </div>
      </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <p className="text-gray-600 text-lg">Add some items to your cart.</p>
        </div>
      )}
    </motion.div>
  );
}
