import React, { useEffect, useState } from "react";

import { BsGrid, BsList } from "react-icons/bs";
import { category } from "../components/admin_comp/Add_popup";
import RowContainer from "../components/home/RowContainer";
import {  useStateValue } from "../context/StateProvider";

export default function Foods() {
  const bar = ">>";
  const [filter, setFilter] = useState("Dinner");
  const [view, setView] = useState("true");
  const [sortt, setsortt] = useState("false")
  const [{foodItem},dispatch,] = useStateValue();
  const [foods, setFoods] = useState(foodItem); // Use a separate state variable for the sorted array
  
  const [text,setText] = useState("");

  const updateSearchValue = (e) => {
    setText(
      e.target.value,
      
    );
    console.log(text);
    console.log(foods);
    console.log(foodItem);
    let foo = [...foodItem];
    console.log(foo);
    foo =foo.filter((food) => food.item_name.toLowerCase().includes(e.target.value));
    console.log("kk");
    console.log(foo);
    setFoods(foo);
  }
  console.log(foods);
  console.log(foodItem);
  // 
  

  useEffect(() => {
    console.log("vjol");
    console.log(foods);
    console.log(foodItem);
    setFoods(foodItem)
    
  }, [foodItem])
console.log(foodItem);
const sorting = (e) => {
  e.preventDefault();
  let sortedFoods = [...foodItem]; // Create a copy of the foodItem array

  if (e.target.value === "a-z") {
    sortedFoods = sortedFoods.sort((a, b) => a.item_name.localeCompare(b.item_name));
  }
  if (e.target.value === "z-a") {
    sortedFoods = sortedFoods.sort((a, b) => b.item_name.localeCompare(a.item_name));
  }
  if (e.target.value === "lowest") {
    sortedFoods = sortedFoods.sort((a, b) => a.price - b.price);
  }
  if (e.target.value === "highest") {
    sortedFoods = sortedFoods.sort((a, b) => b.price - a.price);
  }

  setsortt(true);
  console.log(sortedFoods);
  console.log(foodItem);
  setFoods(sortedFoods); // Update the state with the sorted array
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

      <div className="bg-blue-100 h-96">
        <div className="h-5 mt-12 mb-16 ml-32 mr-32 ">
          <div className="flex ">
            <div className="w-52">
              {/* search bar need control event loop */}
              <form onSubmit={(e) => e.preventDefault()}>
                
                <input type="text" name="text" value={text} onChange={updateSearchValue}/>
                
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
            <option className="p-1 cursor-pointer h-2" value="lowest">Price(lowest)</option>
            
            <option className="p-1 cursor-pointer h-2" value="highest">Price(highest)</option>
            
            <option className="p-1 cursor-pointer h-2" value="a-z">Price(a-z)</option>
            
            <option className="p-1 cursor-pointer h-2" value="z-a">Price(z-a)</option>
          </select>
        </form>


                <BsGrid className={`${view ? "text-red-600" : null} text-2xl mt-3`} onClick={() => setView(true)}/>
                <BsList className={`${view ? null : "text-red-600"} text-2xl mt-3`} onClick={() => setView(false)}/>
              </div>
              
            </div>
          </div>

          <div className="flex mt-6">
            <div className="w-52 h-auto ">
              <div>
                <p>All Menu</p>
                
                {category &&
                  category.map((category) => (
                    <div
                      key={category?.id}
                      onClick={() => setFilter(category.value)}
                    >
                      <div className={`group ${
                  filter === category.value ? "bg-red-500" : "bg-slate-300"
                } w-48 h-6 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out mt-6`}>
                        <p className="">{bar} {category.value}</p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-6">
                <p>price filter</p>
                <p>$34 - $5</p>
                <button type="">filter price</button>
              </div>

              <div className="mt-6">
                <p>popular tags</p>
              </div>
            </div>
            <div className="flex-auto bg-red-100 ">
              <div className="flex w-full ">
              {view ? <RowContainer gridORlist={true}
      flag={false}
      data={foods?.filter((n) => n.category === filter)}
    /> : <RowContainer gridORlist={false}
    flag={false}
    data={foods?.filter((n) => n.category === filter)}
  />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
