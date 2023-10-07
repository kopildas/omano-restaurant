import { motion } from "framer-motion";
import React, { useState } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import { MdShoppingBasket } from "react-icons/md";
import { useNavigate } from "react-router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

export default function FeatureFoods({ type = "feature" }) {
  const [{ foodItem, cartItems }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const [swiper, setSwiper] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [updatedItem, setUpdatedItem] = useState([]);

  let featureData;
  if (foodItem) {
    if (type === "feature") {
      featureData = foodItem.filter((item) => item.feature === true);
    } else {
      featureData = foodItem.filter((item) => item.category === type);
    }
  }

  const handleMouseEnter = () => {
    console.log("enter");
    if (swiper) {
      swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    console.log("leave");
    if (swiper) {
      swiper.autoplay.start();
    }
  };

  const stopEventPropagationTry = (event) => {
    if (event.target != event.currentTarget) {
      event.stopPropagation();
    }
  };

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
  };
  /**
   * The function `addToCart` adds an item to the cart and updates the quantity if the item is already
   * in the cart.
   */
  let flg = true;
  const addtoCart = (item) => {
    // console.log(item.id);
    // cartItems.map((f) => {
    //   if (f.id === item.id) {
    //     cartDispatch();
    //     console.log("yooh");
    //     return
    //   }
    // });
    if (item.cartORadd === "cart") {
      item.cartORadd = "add";

      cartItems.map((f) => {
        if (f.id === item.id) {
          const num = parseFloat(f.quantity);
          f.quantity = num + 1;
          console.log(f.quantity);
          cartDispatch();
          flg = false;
          return;
        } else {
          console.log(f.id);
          console.log(item.id);
        }
      });

      if (flg) {
        dispatch({
          type: actionType.SET_CART_ITEMS,
          cartItems: [...cartItems, item],
        });
        console.log("etaw holo");
        localStorage.setItem("cartItems", JSON.stringify([...cartItems, item]));
      }
    } else if (item.cartORadd === "add") {
      setQuantity(quantity + 1);
      cartItems.map((f) => {
        if (f.id === item.id) {
          const num = parseFloat(f.quantity);
          f.quantity = num + 1;
        } else {
        }
      });
      cartDispatch();
    }
    // localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <div>
      <div className="swiper-container m-10 hidden md:block overflow-x-hidden">
        <Swiper
          slidesPerView={4}
          spaceBetween={50}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper overflow-x-hidden "
          onSwiper={setSwiper}
        >
          {featureData &&
            featureData.map((item) => (
              <SwiperSlide
                key={item.id}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full "
              >
                <div className="flex items-center justify-center ">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    // whileHover={{ scale: [1, 1, 0.9] }}
                    transition={{ duration: 0.09 }}
                    style={{
                      // backgroundImage: `url(${item?.images})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    alt=""
                    className={` rounded-lg -mt-7 drop-shadow-2xl`}
                  >
                    <div className="min-h-screen flex items-center">
                      <div className="container mx-auto p-9 bg-white max-w-sm rounded-2xl flex-col overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex justify-between gap-5 items-center">
                        <img
                          className="rounded-xl w-48 h-48"
                          src={item?.images}
                          alt=""
                        />
                        <div className="flex flex-shrink justify-between gap-10 items-center">
                          <div>
                            <h1 className="mt-5 font-semibold">
                              {item?.item_name}
                            </h1>
                            <p className="mt-2 text-2xl">
                              <span className="text-xl text-red-500">$</span>{" "}
                              {item?.price}
                            </p>
                          </div>
                          <div>
                            {/* <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 ">
                            Buy Now
                          </button> */}
                            <motion.div
                              whileTap={{ scale: 1.2 }}
                              whileHover={{ scale: 1 }}
                              className="flex bg-orange-500 items-center justify-center w-12 h-12 text-4xl rounded-full cursor-pointer hover:shadow-md"
                              onClick={(e) => {
                                stopEventPropagationTry(e); // Prevent event from propagating
                                addtoCart(item);
                              }}
                            >
                              {item?.cartORadd === "cart" ? (
                                <MdShoppingBasket className="text-white" />
                              ) : (
                                <BsCartPlusFill className="text-white" />
                              )}
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* for mobile view */}
      <div className="swiper-container w-full md:hidden -mt-44">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          onSwiper={setSwiper}
        >
          {featureData &&
            featureData.map((item) => (
              <SwiperSlide
                key={item.id}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-96 overflow-x-hidden"
              >
                <div className="flex w-96 items-center justify-center ">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    // whileHover={{ scale: [1, 1, 0.9] }}
                    transition={{ duration: 0.09 }}
                    style={{
                      // backgroundImage: `url(${item?.images})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    alt=""
                    className={` rounded-lg -mt-7 drop-shadow-2xl`}
                  >
                    <div className="min-h-screen flex items-center">
                      <div className="container mx-auto p-9 bg-white max-w-sm rounded-2xl flex-col overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex justify-between gap-5 items-center">
                        <img
                          className="rounded-xl w-48 h-48"
                          src={item?.images}
                          alt=""
                        />
                        <div className="flex flex-shrink justify-between gap-10 items-center">
                          <div>
                            <h1 className="mt-5 font-semibold">
                              {item?.item_name}
                            </h1>
                            <p className="mt-2 text-2xl">
                              <span className="text-xl text-red-500">$</span>{" "}
                              {item?.price}
                            </p>
                          </div>
                          <div>
                            {/* <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 ">
                            Buy Now
                          </button> */}
                            <motion.div
                              whileTap={{ scale: 1.2 }}
                              whileHover={{ scale: 1 }}
                              className="flex items-center justify-center w-12 h-12 text-4xl rounded-full cursor-pointer hover:shadow-md"
                              onClick={(e) => {
                                stopEventPropagationTry(e); // Prevent event from propagating
                                addtoCart(item);
                              }}
                            >
                              {item?.cartORadd === "cart" ? (
                                <MdShoppingBasket className="text-white" />
                              ) : (
                                <BsCartPlusFill className="text-white" />
                              )}
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
