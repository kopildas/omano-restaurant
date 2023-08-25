import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { useStateValue } from "../context/StateProvider";
import Description from "../components/home/Description";
import Review from "../components/home/Review";
import CartContainer from "../components/home/CartContainer";

export default function SingleFood() {
  const bar = ">>";
  const { id } = useParams();
  console.log(id);
  const [{ foodItem }, dispatch] = useStateValue();
  const [number, setNumber] = useState(0);
  const [view, setView] = useState("description");

  useEffect(() => {
    if (foodItem != null) {
      console.log(foodItem);
    }
  }, [foodItem]);
  console.log(foodItem);
  const selectedFood = foodItem.find((food) => food.id === id);
  console.log(selectedFood);

  return (
    <div>
      <div className="cover_1">
        <div className="grid h-full grid-flow-row">
          <div className="flex flex-col items-start justify-center px-44">
            <p>Food DeTails</p>
            <p>
              Home <span className="text-red-500 text">{bar}</span> Food DeTails
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col-2 p-32 ">
        <div className="flex-1 bg-slate-600 items-end justify-end flex">
          <img src={selectedFood.images} alt="" className="" />
        </div>
        <div className="flex-1  flex flex-col justify-between p-12">
          <div>
            <p className="text text-3xl font-semibold mb-3">
              {selectedFood.item_name}
            </p>
            <p className="text text-red-600 font-semibold ">Ratings</p>
            <p className=" text-gray-600 mt-4 mb-4">
              Description Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Vel, deleniti neque magni fugit quasi eum? Quae, aliquam?
              Exercitationem iure nihil maiores libero qui modi, molestias cum
              officiis blanditiis, dignissimos deleniti.
            </p>
          </div>
          <div className="flex flex-row gap-8">
            <div className="w-auto p-2 items-baseline font-bold border border-b-gray-500 rounded-lg ">
              <div className=" flex gap-3">
                <button className="" onClick={() => setNumber(number - 1)}>
                  -
                </button>{" "}
                {number}{" "}
                <button className="" onClick={() => setNumber(number + 1)}>
                  +
                </button>
              </div>
            </div>

            <button className="bg-red-300 rounded-md p-2 font-semibold hover:bg-red-500 transition duration-150 ease-in-out">
              Add to Cart
            </button>
            <p className="p-2 bg-black hover:bg-slate-100 transition duration-150 ease-in-out cursor-pointer rounded-full text-xl">
              ❤
            </p>
          </div>
          <p className="mt-5 text-gray-700">
            <span className="font-bold">CATEGORY:</span> {selectedFood.category}
          </p>
        </div>
      </div>

      {/* review and descriptions */}
      <div className="flex flex-col gap-5 pr-32 pl-32 pb-32 h-[100%]">
        <div className="flex flex-row gap-6">
          <p
            className={`font-semibold text-xl border-b-2 ${
              view === "description" ? "border-b-red-600" : ""
            }  cursor-pointer hover:border-b-red-600 transition duration-150 ease-in-out`}
            onClick={() => setView("description")}
          >
            Description
          </p>
          <p
            className={`font-semibold text-xl border-b-2 ${
              view === "review" ? "border-b-red-600" : ""
            }  cursor-pointer hover:border-b-red-600 transition duration-150 ease-in-out`}
            onClick={() => setView("review")}
          >
            Review
          </p>
        </div>
        <div>{view === "description" ? <Description /> : <Review />}</div>
      </div>

      {/* give review */}

      <div className="flex flex-col gap-5 pr-32 pl-32 pb-32 h-[100%]">
        <p className="font-bold text-2xl">Leave a Review</p>
        <p>Add your Rating</p>
        <form className="flex flex-col gap-5">
          {/* <div className="flex flex-col gap-5">
      <label className="font-semibold">Rating</label>
      <select className="w-full">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
    <div className="flex flex-col gap-5">
      <label className="font-semibold">Title</label>
      <input type="text" className="w-full" placeholder="Title" />
    </div> */}
          <div className="flex flex-col gap-5">
            <label className="font-semibold">Description</label>
            <textarea
              className="w-full h-36 rounded-md"
              placeholder="Description"
            ></textarea>
          </div>
          <div className="flex flex-row gap-5 w-full">
            <div className="w-full">
              <label className="font-semibold">Name</label>
              <input
                type="text"
                className="w-full rounded-md"
                placeholder="Name"
              />
            </div>
            <div className="w-full">
              <label className="font-semibold">Email</label>
              <input
                type="email"
                className="w-full rounded-md"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="flex flex-row gap-5">
            <button className="bg-red-300 rounded-md p-2 font-semibold hover:bg-red-500 transition duration-150 ease-in-out">
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* related foods */}
      <div className="flex flex-col gap-5 pr-32 pl-32 pb-32 h-[100%]">
        <p className="font-bold text-2xl">Related Foods</p>
      </div>
      <CartContainer/>
    </div>
  );
}
