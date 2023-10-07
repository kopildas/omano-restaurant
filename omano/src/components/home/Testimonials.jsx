import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import ReactStar from "react-rating-stars-component";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { getAllReview } from "../../api";
import "./Testimonials.css";
import { Autoplay, Navigation } from "swiper/modules";

export default function Testimonials() {
  const [reviews, setReviews] = useState(null);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    getAllReview().then((data) => {
      if (data) {
        setReviews(data);
      }
    });
  }, []);

  const handleMouseEnter = () => {
    if (swiper) {
      swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiper) {
      swiper.autoplay.start();
    }
  };

  return (
    // <div>
    

    //   <div className="swiper-container -mt-5 container m-20 md:w-[1100px] w-96 bg-red-400 hidden md:block">
    //   <p className="flex items-center justify-center text-xl text-red-400">
    //     CUSTOMER FEEDBACK
    //   </p>
    //   <p className="flex items-center justify-center md:text-5xl text-xl font-semibold ">
    //     What Customers Say About us
    //   </p>
    //     <Swiper
    //       slidesPerView={4}
    //       spaceBetween={50}
    //       loop={true}
    //       autoplay={{
    //         delay: 1000,
    //         disableOnInteraction: false,
    //       }}
    //       navigation={true}
    //       modules={[Autoplay, Navigation]}
    //       className="mySwiper"
    //       onSwiper={setSwiper}
    //     >
    //       {reviews &&
    //         reviews.map((item) => (
    //           <SwiperSlide
    //             key={item.id}
    //             onMouseEnter={handleMouseEnter}
    //             onMouseLeave={handleMouseLeave}
    //           >
    //             <motion.div
    //               whileHover={{ scale: 1.2 }}
    //               // whileHover={{ scale: [1, 1, 0.9] }}
    //               transition={{ duration: 0.09 }}
    //               style={{
    //                 // backgroundImage: `url(${item?.images})`,
    //                 backgroundSize: "cover",
    //                 backgroundPosition: "center",
    //                 backgroundRepeat: "no-repeat",
    //               }}
    //               alt=""
    //               className={`w-72 m-20 rounded-lg relative drop-shadow-2xl`}
    //             >
    //               <div className=" flex items-center">
    //                 <div className="container mx-auto p-9 h-[500px] max-w-sm rounded-2xl flex-col overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex justify-between gap-5 items-center">
    //                   <motion.div
    //                     whileHover={{ scale: 1.2 }}
    //                     transition={{ duration: 0.09 }}
    //                     style={{
    //                       background: `url(${
    //                         item?.user_pic || "../../../public/images/avtar.jpg"
    //                       })`,
    //                       backgroundSize: "cover",
    //                       backgroundPosition: "center",
    //                       backgroundRepeat: "no-repeat",
    //                       width: "140px", // Adjust the desired width
    //                       height: "140px", // Adjust the desired height
    //                     }}
    //                     alt=""
    //                     className={`rounded-full   drop-shadow-2xl`}
    //                   >
    //                     {/* Rest of your content */}
    //                   </motion.div>

    //                   <div className="flex flex-col justify-between gap-5 items-center">
    //                     <div>
    //                       <h1 className="text-2xl font-semibold">
    //                         {item?.user_name || "User"}
    //                       </h1>
    //                     </div>
    //                     <div className=" overflow-y-auto h-32 ">
    //                       <p className="mt-2 items-center justify-center">
    //                         {item?.review}
    //                       </p>
    //                     </div>
    //                     <div>
    //                       {/* <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 ">
    //                         Buy Now
    //                       </button> */}
    //                       <motion.div
    //                         whileTap={{ scale: 1.2 }}
    //                         whileHover={{ scale: 1 }}
    //                         className="rounded-full cursor-pointer hover:shadow-md"
    //                         // onClick={(e) => {
    //                         //   stopEventPropagationTry(e); // Prevent event from propagating
    //                         //   addtoCart(item);
    //                         // }}
    //                       >
    //                         <ReactStar
    //                           edit={false}
    //                           size={50}
    //                           value={item.rating}
    //                         />
    //                       </motion.div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </motion.div>
    //           </SwiperSlide>
    //         ))}

    //       {/* <div className="slider-controler">
    //       <div className="swiper-button-prev slider-arrow">
    //         <ion-icon name="arrow-back-outline"></ion-icon>
    //       </div>
    //       <div className="swiper-button-next slider-arrow">
    //         <ion-icon name="arrow-forward-outline"></ion-icon>
    //       </div>
    //       <div className="swiper-pagination"></div>
    //     </div> */}
    //     </Swiper>
    //   </div>




    //   {/* for mobile view */}
    //   <div className=" -mt-5  m-20 md:w-[1100px] w-72 bg-red-400 md:hidden flex flex-col">
    //   <div>
    //   <p className="flex items-center justify-center text-xl text-red-400">
    //     CUSTOMER FEEDBACK
    //   </p>
    //   <p className="flex items-center justify-center md:text-5xl text-xl font-semibold ">
    //     What Customers Say About us
    //   </p>
    //   </div>
    //     <div>
    //     <Swiper
    //       slidesPerView={1}
    //       spaceBetween={50}
    //       loop={true}
    //       autoplay={{
    //         delay: 100000,
    //         disableOnInteraction: false,
    //       }}
    //       navigation={true}
    //       modules={[Autoplay, Navigation]}
    //       className="mySwiper"
    //       onSwiper={setSwiper}
    //     >
    //       {reviews &&
    //         reviews.map((item) => (
    //           <SwiperSlide
    //             key={item.id}
    //             onMouseEnter={handleMouseEnter}
    //             onMouseLeave={handleMouseLeave}
    //           >
    //             <motion.div
    //               whileHover={{ scale: 1.2 }}
    //               // whileHover={{ scale: [1, 1, 0.9] }}
    //               transition={{ duration: 0.09 }}
    //               style={{
    //                 // backgroundImage: `url(${item?.images})`,
    //                 backgroundSize: "cover",
    //                 backgroundPosition: "center",
    //                 backgroundRepeat: "no-repeat",
    //               }}
    //               alt=""
    //               className={`w-72 m-20 rounded-lg relative drop-shadow-2xl`}
    //             >
    //               <div className=" flex items-center">
    //                 <div className="container mx-auto p-9 h-[500px] max-w-sm rounded-2xl flex-col overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex justify-between gap-5 items-center">
    //                   <motion.div
    //                     whileHover={{ scale: 1.2 }}
    //                     transition={{ duration: 0.09 }}
    //                     style={{
    //                       background: `url(${
    //                         item?.user_pic || "../../../public/images/avtar.jpg"
    //                       })`,
    //                       backgroundSize: "cover",
    //                       backgroundPosition: "center",
    //                       backgroundRepeat: "no-repeat",
    //                       width: "140px", // Adjust the desired width
    //                       height: "140px", // Adjust the desired height
    //                     }}
    //                     alt=""
    //                     className={`rounded-full   drop-shadow-2xl`}
    //                   >
    //                     {/* Rest of your content */}
    //                   </motion.div>

    //                   <div className="flex flex-col justify-between gap-5 items-center">
    //                     <div>
    //                       <h1 className="text-2xl font-semibold">
    //                         {item?.user_name || "User"}
    //                       </h1>
    //                     </div>
    //                     <div className=" overflow-y-auto h-32 ">
    //                       <p className="mt-2 items-center justify-center">
    //                         {item?.review}
    //                       </p>
    //                     </div>
    //                     <div>
    //                       {/* <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 ">
    //                         Buy Now
    //                       </button> */}
    //                       <motion.div
    //                         whileTap={{ scale: 1.2 }}
    //                         whileHover={{ scale: 1 }}
    //                         className="rounded-full cursor-pointer hover:shadow-md"
    //                         // onClick={(e) => {
    //                         //   stopEventPropagationTry(e); // Prevent event from propagating
    //                         //   addtoCart(item);
    //                         // }}
    //                       >
    //                         <ReactStar
    //                           edit={false}
    //                           size={50}
    //                           value={item.rating}
    //                         />
    //                       </motion.div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </motion.div>
    //           </SwiperSlide>
    //         ))}

    //       {/* <div className="slider-controler">
    //       <div className="swiper-button-prev slider-arrow">
    //         <ion-icon name="arrow-back-outline"></ion-icon>
    //       </div>
    //       <div className="swiper-button-next slider-arrow">
    //         <ion-icon name="arrow-forward-outline"></ion-icon>
    //       </div>
    //       <div className="swiper-pagination"></div>
    //     </div> */}
    //     </Swiper>
    //     </div>
    //   </div>
    // </div>
   <div>
      <div  className="swiper-container w-screen p-10 hidden md:block">
      <Swiper
        slidesPerView={4}
        spaceBetween={50}
        loop={true}
        
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        onSwiper={setSwiper}
      >
        {reviews &&
          reviews.map((item) => (
            <SwiperSlide
              key={item.id}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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
                  <div className=" flex items-center">
                   <div className="container mx-auto p-9 h-[500px] max-w-sm rounded-2xl flex-col overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex justify-between gap-5 items-center">
                     <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.09 }}
                        style={{
                          background: `url(${
                            item?.user_pic || "../../../public/images/avtar.jpg"
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          width: "140px", // Adjust the desired width
                          height: "140px", // Adjust the desired height
                        }}
                        alt=""
                        className={`rounded-full   drop-shadow-2xl`}
                      >
                        {/* Rest of your content */}
                      </motion.div>

                      <div className="flex flex-col justify-between gap-5 items-center">
                        <div>
                          <h1 className="text-2xl font-semibold">
                            {item?.user_name || "User"}
                          </h1>
                        </div>
                        <div className=" overflow-y-auto h-32 ">
                          <p className="mt-2 items-center justify-center">
                            {item?.review}
                          </p>
                        </div>
                        <div>
                          {/* <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 ">
                            Buy Now
                          </button> */}
                          <motion.div
                            whileTap={{ scale: 1.2 }}
                            whileHover={{ scale: 1 }}
                            className="rounded-full cursor-pointer hover:shadow-md"
                            // onClick={(e) => {
                            //   stopEventPropagationTry(e); // Prevent event from propagating
                            //   addtoCart(item);
                            // }}
                          >
                            <ReactStar
                              edit={false}
                              size={50}
                              value={item.rating}
                            />
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
      <div className="swiper-container w-screen md:hidden -mt-34">
      <Swiper
        slidesPerView={1}
        spaceBetween={50}
        loop={true}
        
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        onSwiper={setSwiper}
      >
        {reviews &&
          reviews.map((item) => (
            <SwiperSlide
              key={item.id}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
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
                  <div className=" flex items-center">
                   <div className="container mx-auto p-9 h-[500px] max-w-sm rounded-2xl flex-col overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 flex justify-between gap-5 items-center">
                     <motion.div
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.09 }}
                        style={{
                          background: `url(${
                            item?.user_pic || "../../../public/images/avtar.jpg"
                          })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          width: "140px", // Adjust the desired width
                          height: "140px", // Adjust the desired height
                        }}
                        alt=""
                        className={`rounded-full   drop-shadow-2xl`}
                      >
                        {/* Rest of your content */}
                      </motion.div>

                      <div className="flex flex-col justify-between gap-5 items-center">
                        <div>
                          <h1 className="text-2xl font-semibold">
                            {item?.user_name || "User"}
                          </h1>
                        </div>
                        <div className=" overflow-y-auto h-32 ">
                          <p className="mt-2 items-center justify-center">
                            {item?.review}
                          </p>
                        </div>
                        <div>
                          {/* <button className="text-white text-md font-semibold bg-green-400 py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 ">
                            Buy Now
                          </button> */}
                          <motion.div
                            whileTap={{ scale: 1.2 }}
                            whileHover={{ scale: 1 }}
                            className="rounded-full cursor-pointer hover:shadow-md"
                            // onClick={(e) => {
                            //   stopEventPropagationTry(e); // Prevent event from propagating
                            //   addtoCart(item);
                            // }}
                          >
                            <ReactStar
                              edit={false}
                              size={50}
                              value={item.rating}
                            />
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


// productId: 1695048270982,
//       user_pic:
//         'https://lh3.googleusercontent.com/a/AAcHTte064rxcazfu2Vn2ZTD0MX0NKa8pUJmSsNpseOczAMCtis=s96-c',
//       user_id: '5QX89PwQ3HhdhGwyH190EmfOSzb2',
//       user_name: 'Kopil Das',
//       review: 'naaaaaaaah not good at all',
//       rating: 3,
//       food_id: '1694465947528',
//       id: '1695048270982'












