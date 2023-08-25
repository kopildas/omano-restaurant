import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import {BsCartPlusFill} from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

export default function RowContainer({
  flag,
  data,
  scrollValue,
  gridORlist = true,
}) {
  const rowContainer = useRef();
  const [quantity, setQuantity] = useState(1)
  const[updatedItem,setUpdatedItem] = useState([])
  const [{ cartItems }, dispatch] = useStateValue();
  const navigate = useNavigate();


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



  /**
   * The function `addToCart` adds an item to the cart and updates the quantity if the item is already
   * in the cart.
   */
  const addtoCart = (item) => {
    console.log(item.id);
    if (item.cartORadd === "cart") {
      dispatch({
        type: actionType.SET_CART_ITEMS,
        cartItems: [...cartItems, item],
      });
      localStorage.setItem("cartItems", JSON.stringify([...cartItems, item]));
      item.cartORadd = "add"
     
    }
    else if (item.cartORadd === "add") {
      
        setQuantity(quantity + 1)
        cartItems.map((f) => {
          if (f.id === item.id) {
          const num =parseFloat(f.quantity)
          f.quantity = num + 1
          console.log(f.quantity);
          }
        })
        cartDispatch();
      } 
    // localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };


  useEffect(()=> {
    setUpdatedItem(cartItems)
    console.log(cartItems);
  }, [cartItems])



  const stopEventPropagationTry = (event) => {
    if (event.target != event.currentTarget) {
      event.stopPropagation();
    }
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center my-12 gap-6 md:gap-7 p-1 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex flex-wrap justify-center"
      } ${gridORlist ? null : "flex-col"}`}
    >
      {data &&
        data.map((item) => (
          <div
            key={item?.id}
            onClick={() => navigate(`/singlefood/${item?.id}`)}
            className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 min-w-[220px] h-auto bg-gray-100 rounded-lg p-2 my-5 backdrop-blur-lg hover:drop-shadow-2xl"
          >
            {/* <NavLink to={`/singlefood/${item?.id}`}> */}
            <div className="flex items-center justify-between w-full">
              <motion.img
                whileTap={{ scale: 1.2 }}
                src={item?.images}
                alt=""
                className="w-40 h-40 rounded-full -mt-8 drop-shadow-2xl"
              />
              <motion.div
                whileTap={{ scale: 1.2 }}
                className="flex items-center justify-center w-12 h-12 text-2xl bg-red-600 rounded-full cursor-pointer hover:shadow-md"
                onClick={(e) => {
                  stopEventPropagationTry(e); // Prevent event from propagating
                  addtoCart(item);
                }}
              >
                {item?.cartORadd==="cart" ? (<MdShoppingBasket className="text-white" />) : (<BsCartPlusFill className="text-white"/>)}
              </motion.div>
            </div>
            <div className="flex flex-col items-end justify-end w-full">
              <p className="text-base font-semibold text-textColor md:text-lg">
                {item?.item_name}
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg font-semibold text-headingColor">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
            </div>
            {/* </NavLink> */}
          </div>
        ))}
    </div>
  );
}
