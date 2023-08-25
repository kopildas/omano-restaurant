import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";

import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from '../../context/StateProvider';
import { actionType } from '../../context/reducer';



export default function CartitemComponenet({item,id}) {

    const [quantity, setQuantity] = useState(1)
    const[updatedItem,setUpdatedItem] = useState([])
    const [{ cartItems }, dispatch] = useStateValue();

    const cartDispatch = () => {
      console.log(updatedItem);
      // localStorage.setItem("cartItems", JSON.string(updatedItem));
      localStorage.setItem("cartItems", JSON.stringify(updatedItem));
      console.log("dfasd");
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: updatedItem,
      })
      console.log(updatedItem);
    }


// cartItem update in database
    const updateQuantity = (type, id) => {
        if (type === "add") {
          console.log(type);
            setQuantity(quantity + 1)
            cartItems.map((f) => {
              if (f.id === id) {
              const num =parseFloat(f.quantity)
              f.quantity = num + 1
              console.log(f.quantity);
              }
            })
            cartDispatch();
          } 
    }
console.log(updatedItem);

    useEffect(()=> {
      setUpdatedItem(cartItems)
      console.log(cartItems);
    }, [quantity])



  return (
    <div  className="w-full p-1 px-2 rounded-lg bg-gray-600 flex items-center gap-2">
            <div className="gap-2 h-20  flex items-center justify-center">
              <img
                src={item.images}
                className="w-16 h-16 rounded-full"
                alt=""
              />

              <div className="flex flex-col gap-2">
                <p className="text-base text-gray-50">{item.item_name}</p>
                <p className="text-sm text-gray-400 font-semibold">$ {parseFloat(item?.price) * quantity}</p>
              </div>

              {/* adding section */}
              <div className="group flex items-center gap-2 ml-4 cursor-pointer">
                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQuantity("remove", item?.id)}>
                  <BiMinus className="text-gray-50" />
                </motion.div>
                <p className="w-5 h-5 rounded-sm bg-gray-600 text-gray-50 flex items-center justify-center">
                  {item?.quantity}
                </p>
                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQuantity("add", item?.id)}>
                  <BiPlus className="text-gray-50" />
                </motion.div>
              </div>
            </div>
          </div>
  )
}
