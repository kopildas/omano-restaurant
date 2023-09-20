import React, { useEffect, useState } from "react";
import ReactStar from "react-rating-stars-component";
import { useParams } from "react-router";
import CartContainer from "../components/home/CartContainer";
import Description from "../components/home/Description";
import Review from "../components/home/Review";
import { useStateValue } from "../context/StateProvider";
import { toast } from "react-toastify";
import Spinner from "../../src/components/Spinner";
import { addNewReview } from "../api";

export default function SingleFood() {
  const bar = ">>";
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [{ foodItem, cartShow ,user}, dispatch] = useStateValue();
  const [number, setNumber] = useState(0);
  const [view, setView] = useState("description");
  let [formData, setFormData] = useState({
    food_id: id,
    user_id: user.uid,
    user_name:user.name,
    user_pic: user.picture || null,
    rating: 0,
    review: "",
    date: 0,
    isFeatured: false,
  });
  const { review, rating, user_id, food_id } = formData;
  console.log(id);
console.log(user);

  useEffect(() => {
    if (foodItem != null) {
      console.log(foodItem);
    }
  }, [foodItem]);
  console.log(foodItem);
  const selectedFood = foodItem.find((food) => food.id === id);
  console.log(selectedFood);


  const ratingChanged = (newRating) => {
    setFormData((prevState) => ({
      ...prevState,
      rating: newRating || 0,
    }));
  };


  function onChange(e) {
    console.log("holo ");
    setFormData((prevState) => ({
        ...prevState,
        review: e.target.value,
      }));
  }

  console.log(formData);
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    if (!food_id || !user_id || !rating || !review) {

      setLoading(false);
      toast.error("Please fill all the fields");
      return;
    }
  


  addNewReview(formData).then((res)=>{
    console.log(res);
    console.log("holo ");
  })
  console.log("kire");
  setTimeout(() => {
    setLoading(false);
    // addDataNotifi();
  }, 3000);

}



  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="hidden md:block">
        <div className="md:cover_1 hidden">
          <div className="grid h-full grid-flow-row">
            <div className="flex flex-col items-start justify-center px-44">
              <p>Food DeTails</p>
              <p>
                Home <span className="text-red-500 text">{bar}</span> Food
                DeTails
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col-2 p-10 ">
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
              <span className="font-bold">CATEGORY:</span>{" "}
              {selectedFood.category}
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
          <div>{view === "description" ? <Description food_id={formData.food_id} /> : <Review food_id={formData.food_id}/>}</div>
        </div>

        {/* give review */}

        <div className="flex flex-col gap-5 pr-32 pl-32 pb-32 h-[100%]">
          <p className="font-bold text-2xl">Leave a Review</p>
          <ReactStar size={50} onChange={ratingChanged} />
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            
            <div className="flex flex-col gap-5">
              <label className="font-semibold">Description</label>
              <textarea
                className="w-full h-36 rounded-md"
                placeholder="Description"
                onChange={onChange}
              ></textarea>
            </div>
            {/* <div className="flex flex-row gap-5 w-full">
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
            </div> */}
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
        {cartShow && <CartContainer />}
      </div>

      {/* mobile view */}
      <div className="visible md:hidden">
        {cartShow && <CartContainer />}
        <div className="flex items-center justify-center flex-row">
          <div className="flex-1 items-end justify-end flex">
            <div
              className="bg-cover mt-1 bg-center h-full w-full rounded-b-[20px] rounded-t-[20px]"
              style={{ backgroundImage: `url(${selectedFood.images})` }}
            >
              <p className="bg-transparent h-96"></p>
              <div className="flex items-end justify-end pr-5 -mb-5">
                <p className="p-2 bg-black hover:bg-slate-100 transition duration-150 ease-in-out cursor-pointer rounded-full w-12 h-12 text-xl flex items-center justify-center">
                  ❤
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* food details */}
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
          </div>
          <p className="mt-5 text-gray-700">
            <span className="font-bold">CATEGORY:</span> {selectedFood.category}
          </p>
        </div>

        {/* review and descriptions */}
        <div className="flex flex-col gap-5 p-10 h-[100%]">
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

        <div className="flex flex-col gap-5 p-10 h-[100%]">
          <p className="font-bold text-2xl">Leave a Review</p>
          <ReactStar />
          <form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
                onChange={onChange}
              ></textarea>
            </div>
            {/* <div className="flex flex-row gap-5 w-full">
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
            </div> */}
            <div className="flex flex-row gap-5">
              <button className="bg-red-300 rounded-md p-2 font-semibold hover:bg-red-500 transition duration-150 ease-in-out">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* related foods */}
        <div className="flex flex-col gap-5 p-10 h-[100%]">
          <p className="font-bold text-2xl">Related Foods</p>
        </div>
      </div>
      {/* mobile view enden div ^ */}
    </div>
  );
}
