import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {MdOutlineDeleteForever} from "react-icons/md"
import { BiMinus, BiPlus } from "react-icons/bi";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

export default function CartitemComponenet({ item, id,setiingTotal }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [{ cartItems }, dispatch] = useStateValue();
  const [updatedItem, setUpdatedItem] = useState(cartItems);
  const [isOpen, setIsOpen] = useState(true);

  const cartDispatch = () => {
    console.log(updatedItem);
    // localStorage.setItem("cartItems", JSON.string(updatedItem));
    localStorage.removeItem("cartItems");
    localStorage.setItem("cartItems", JSON.stringify(updatedItem));
    console.log("dfasd");
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: updatedItem,
    });
    console.log(updatedItem);
    console.log(cartItems);
  };

  // cartItem update in database
  const updateQuantity = (type, id) => {
    if (type === "add") {
      console.log(type);
      setQuantity(quantity + 1);
      cartItems.map((f) => {
        if (f.id === id) {
          const num = parseFloat(f.quantity);
          f.quantity = num + 1;
          console.log(f.quantity);
        }
      });
      // cartDispatch();
    }
    else if(type === "remove") {
      if(item.quantity == 1)
      {

        setUpdatedItem(cartItems.filter((item)=> item.id !== id))


        // cartDispatch()
      }
      else
      {
        setQuantity(quantity - 1);
      cartItems.map((f) => {
        if (f.id === id) {
          const num = parseFloat(f.quantity);
          f.quantity = num - 1;
          console.log(f.quantity);
        }
      });
      // cartDispatch();
      }
    }
    else if(type === "delete")
    {
   
        setUpdatedItem(cartItems.filter((item)=> item.id !== id))


        // this will update rowcontainer initial value and control add or cart item
        item.cartORadd = "cart";
        item.quantity = 1;
        // cartDispatch()
    }
  };
  console.log(updatedItem);


  useEffect(() => {
    cartDispatch();
    console.log(updatedItem);
    console.log(cartItems);
  }, [updatedItem,quantity]);



  useEffect(() => {
    setUpdatedItem(cartItems);
    console.log(cartItems);
  }, [quantity,cartItems]);



  useEffect(() => {
    let totalpr = cartItems.reduce(function (accum,item){
      return accum + item.quantity * item.price;
    }, 0);
    setiingTotal(totalpr);
    console.log(totalpr);
  }, [quantity,cartItems]);


  return (
    <div className="w-full p-1 rounded-lg bg-gray-600 flex items-center ">
      <div className="gap-2 h-20  flex ">
        <div className="h-20 w-48 flex gap-1 items-center justify-center">
          <img src={item.images} className="w-16 h-16 rounded-full p-1" alt="" />

          <div className="flex flex-col gap-2 w-36">
            <p className="text-base text-gray-50">{item.item_name}</p>
            <p className="text-sm text-gray-400 font-semibold">
              $ {parseFloat(item?.price) * item?.quantity} q:${item?.quantity}
            </p>
          </div>
        </div>

        {/* adding section */}
        <div   className={`group  flex items-center gap-2 justify-center  cursor-pointer text-white transition-all duration-500 ${
              isOpen ? "w-16 " : "w-16 "
            } flex-shrink-0`}>
          <motion.div
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQuantity("remove", item?.id)}
          >
            <BiMinus className="text-gray-50" />
          </motion.div>
          <p className="w-5 h-5 rounded-sm bg-gray-600 text-gray-50 flex items-center justify-center">
            {item?.quantity}
          </p>
          <motion.div
          
            whileTap={{ scale: 0.75 }}
            onClick={() => updateQuantity("add", item?.id)}
          >
            <BiPlus className="text-gray-50" />
          </motion.div>
          <div
            onClick={() => updateQuantity("delete", item?.id)}
            onMouseEnter={() => setIsOpen(false)}
            onMouseLeave={() => setIsOpen(true)}
            className={`bg-red-600 rounded-md h-20 group  flex items-center justify-center  cursor-pointer  ${
              isOpen ? "w-16" : "w-36 "
            } `}
          >
            {isOpen ? (<MdOutlineDeleteForever />):(<MdOutlineDeleteForever className="text-4xl"/>)}
          </div>
        </div>
      </div>

      
    </div>
  );
}
