import React, { useEffect, useState } from "react";

import { BsGrid, BsList } from "react-icons/bs";
import { category } from "../components/admin_comp/Add_popup";
import RowContainer from "../components/home/RowContainer";
import { useStateValue } from "../context/StateProvider";

export default function Foods() {
  const bar = ">>";
  const [filter, setFilter] = useState("Fast Food");
  const [view, setView] = useState("true");
  const [sortt, setsortt] = useState("false");
  const [{ foodItem }, dispatch] = useStateValue();
  const [foods, setFoods] = useState(foodItem);
  let [sortedFoods, setSortedFoods] = useState(foodItem); // Use a separate state variable for the sorted array
  const [text, setText] = useState("");
  const [priceArry, setPriceArry] = useState(0);
  const [price, setPrice] = useState(0);
  const [maxPrFilter, setMaxPrFilter] = useState(0);

  const priceFilter = (e) => {
    console.log(e.target.value);
    console.log(maxPrice);
    console.log(foods);
    setPrice(e.target.value);

    // Convert the input value to a number
    const selectedPrice = parseFloat(e.target.value);

    if (selectedPrice === 0) {
      setMaxPrFilter(maxPrice + 10);
    } else {
      setMaxPrFilter(maxPrice + 10);
    }

    let foo = [...sortedFoods];
    console.log(foo);

    if (selectedPrice === 0) {
      foo = foo.filter((curnt) => parseFloat(curnt.price) === selectedPrice);
      console.log(selectedPrice);
    } else {
      foo = foo.filter((curnt) => parseFloat(curnt.price) <= selectedPrice);
      console.log(selectedPrice);
    }

    console.log("kk");
    console.log(foo);
    console.log(foo.length);
    setFoods(foo);
  };

  const updateSearchValue = (e) => {
    setText(e.target.value);
    console.log(text);
    console.log(foods);
    console.log(foodItem);
    let foo = [...sortedFoods];
    console.log(foo);
    foo = foo.filter((food) =>
      food.item_name.toLowerCase().includes(e.target.value)
    );
    console.log("kk");
    console.log(foo);
    setFoods(foo);
  };

  //
  let maxPrice = 0;

  useEffect(() => {
    console.log(foods);
    console.log(foodItem);
    if (foodItem !== null) {
      setPriceArry(foodItem.map((curElm) => curElm.price));
      setSortedFoods(foodItem);
      console.log(priceArry);
      console.log(foodItem);
      setFoods(foodItem);
    }
    console.log(priceArry);
    console.log(foods);
  }, [foodItem]);

  if (priceArry !== 0) {
    maxPrice = Math.max(...priceArry);
    // setMaxPrice(Math.max(...priceArry))
  }
  console.log(maxPrice);

  const sorting = (e) => {
    e.preventDefault();

    // Create a copy of the sortedFoods array
    let sortedFoodsCopy = [...sortedFoods];

    if (text) {
      sortedFoodsCopy = sortedFoodsCopy.filter((food) =>
        food.item_name.toLowerCase().includes(text)
      );
    }

    if (e.target.value === "a-z") {
      sortedFoodsCopy = sortedFoodsCopy.sort((a, b) =>
        a.item_name.localeCompare(b.item_name)
      );
    }
    if (e.target.value === "z-a") {
      sortedFoodsCopy = sortedFoodsCopy.sort((a, b) =>
        b.item_name.localeCompare(a.item_name)
      );
    }
    if (e.target.value === "lowest") {
      sortedFoodsCopy = sortedFoodsCopy.sort((a, b) => a.price - b.price);
    }
    if (e.target.value === "highest") {
      sortedFoodsCopy = sortedFoodsCopy.sort((a, b) => b.price - a.price);
    }

    setsortt(true);
    console.log(sortedFoodsCopy);
    console.log(foodItem);
    setFoods(sortedFoodsCopy); // Update the state with the sorted array
    setSortedFoods(sortedFoodsCopy);
  };

  return (
    <>
      <div className="cover_1">
        <div className="grid h-full grid-flow-row">
          <div className="flex flex-col items-start justify-center px-44">
            <p>Foods</p>
            <p>
              Home <span className="text-red-500 text">{bar}</span> Foods
            </p>
          </div>
        </div>
      </div>

      <div className=" h-96">
        <div className="h-5 mt-12 mb-16 ml-32 mr-32 ">
          <div className="flex ">
            <div className="w-52">
              {/* search bar need control event loop */}
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  name="text"
                  value={text}
                  onChange={updateSearchValue}
                />

                {/* <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button> */}
              </form>
            </div>
            <div className="items-start justify-start flex-1 w-64 bg-red-600">
              hkashas
            </div>
            <div className="flex-1 w-32 ">
              <div className="flex gap-3 items-end justify-end">
                {/* <p>sort</p> */}
                <form className="" action="#">
                  <label htmlFor="sort"></label>
                  <select
                    name="sort"
                    id="sort"
                    className="p-2 mt-3 rounded-xl w-40 font-medium text-gray-500 cursor-pointer"
                    onClick={sorting}
                  >
                    <option className="p-1 cursor-pointer h-2" value="lowest">
                      Price(lowest)
                    </option>

                    <option className="p-1 cursor-pointer h-2" value="highest">
                      Price(highest)
                    </option>

                    <option className="p-1 cursor-pointer h-2" value="a-z">
                      Price(a-z)
                    </option>

                    <option className="p-1 cursor-pointer h-2" value="z-a">
                      Price(z-a)
                    </option>
                  </select>
                </form>

                <BsGrid
                  className={`${view ? "text-red-600" : null} text-2xl mt-3`}
                  onClick={() => setView(true)}
                />
                <BsList
                  className={`${view ? null : "text-red-600"} text-2xl mt-3`}
                  onClick={() => setView(false)}
                />
              </div>
            </div>
          </div>

          <div className="flex mt-6">
            <div className="w-52 h-auto ">
              <div className="bg-gray-100 rounded-md">
                <div className="pl-2 pr-2 pt-2 pb-5">
                  <p className="text-lg font-bold">All Menu</p>

                  {category &&
                    category.map((category) => (
                      <div
                        key={category?.id}
                        onClick={() => setFilter(category.value)}
                      >
                        <div
                          className={`group ${
                            filter === category.value
                              ? "bg-red-500"
                              : "bg-slate-300"
                          } w-48 h-6 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out mt-6`}
                        >
                          <p className="">
                            {bar} {category.value}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="mt-8 p-5 rounded-md bg-slate-100">
                <p className="text-lg font-bold">price filter</p>
                <p className="text-sm font-semibold">${price}</p>

                <input
                  type="range"
                  id="cowbell"
                  name="cowbell"
                  min="0"
                  max={maxPrFilter ? maxPrFilter : maxPrice}
                  value={price}
                  step="10"
                  onChange={priceFilter}
                />
              </div>

              <div className="mt-6">
                <p>popular tags</p>
              </div>
            </div>
            <div className="flex-auto  ">
              <div className="flex w-full ">
                {view ? (
                  <RowContainer
                    gridORlist={true}
                    flag={false}
                    data={foods?.filter((n) => n.category === filter)}
                  />
                ) : (
                  <RowContainer
                    gridORlist={false}
                    flag={false}
                    data={foods?.filter((n) => n.category === filter)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
