import React, { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { category } from "../../components/admin_comp/Add_popup";
import { Pie, Doughnut, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function OrderSummary({ icon, value, total_name }) {
  const [isOpen, setIsOpen] = useState({
    month: false,
    week: false,
    daily: false,
  });

  function monthOrder() {
    setIsOpen(() => ({
      week: false,
      daily: false,
      month: true,
    }));
  }
  function weekOrder() {
    setIsOpen(() => ({
      month: false,
      week: true,
      daily: false,
    }));
  }
  function dailyOrder() {
    setIsOpen(() => ({
      month: false,
      week: false,
      daily: true,
    }));
  }

  const [{ cartItems, foodItem }, dispatch] = useStateValue();

  const [addData, setAddData] = useState(true);
  // const newdata = (data) => setFoods(data);
  const [foods, setFoods] = useState(foodItem);

  console.log(foods);

  const categoryCounts = foodItem.reduce((counts, item) => {
    const category = item.category;
    counts[category] = (counts[category] || 0) + 1;
    return counts;
  }, {});
  const updatedCategoryList = category.map((category) => ({
    value: category.value,
    label: `${categoryCounts[category.value] || 0}`,
  }));

  console.log(updatedCategoryList);
  console.log(categoryCounts);

  //pi chart data
  const userData = {
    labels: updatedCategoryList.map((data) => data.value), // Use the category names as labels
    datasets: [
      {
        axis: "y",
        label: "Quantity",
        data: updatedCategoryList.map((data) => parseInt(data.label)), // Parse the label as an integer
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <div className=" px-6 py-6 rounded-md bg-slate-200">
        <div>
          <p className="text text-lg">Orders Summary</p>
          <p>lorem ipsum dolot sit amet consdajskdj</p>

          <div className="py-5 flex">
            <p className=" rounded py-2 px-5 bg-slate-400 flex gap-4 flex-grow-1">
              <span
                onClick={monthOrder}
                className={`cursor-pointer ${
                  isOpen.month ? "bg-slate-500 text-white rounded p-1" : ""
                } hover:bg-slate-400`}
              >
                Monthly
              </span>
              <span
                onClick={weekOrder}
                className={`cursor-pointer ${
                  isOpen.week ? "bg-slate-500 text-white rounded p-1" : ""
                } hover:bg-slate-400`}
              >
                Weekly
              </span>
              <span
                onClick={dailyOrder}
                className={`cursor-pointer ${
                  isOpen.daily ? "bg-slate-500 text-white rounded p-1" : ""
                } hover:bg-slate-400`}
              >
                daily
              </span>
            </p>
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-center bg-green-100 py-2 md:text-2xl px-2 rounded-xl">
          <div className="md:flex md:flex-grow grid grid-flow-col">
            <p className=" p-2">
              <span className="p-6 py-2 px-5 bg-green-500 rounded-xl text text-lg">
                25
              </span>{" "}
              New orders
            </p>
          </div>

          <p className="md:flex-auto md:flex-col px-3 text-green-500">
            manage orders {">"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 py-5 gap-8 m-3">
          <div className="flex flex-col bg-slate-300 p-5 text text-lg rounded-xl items-center justify-center">
            <p className="text-3xl">25</p>
            <p>On delivery</p>
          </div>
          <div className="flex flex-col bg-green-300 p-5 text text-lg rounded-xl items-center justify-center">
            <p className="text-3xl">65</p>
            <p>Delivered</p>
          </div>
          <div className="flex flex-col bg-red-500 p-5 text text-lg rounded-xl items-center justify-center">
            <p className="text-3xl">7</p>
            <p>Canceled</p>
          </div>
        </div>

        <div className="flex items-center justify-center w-[400px] h-[400px] ">
          <Bar
            data={userData}
            options={{
              indexAxis: "y",
              plugins: {
                title: { display: false, font: { size: 12, family: "rubik" } },
                legend: { display: false, position: "right" },
              },
              maintainAspectRatio: false,
            }}
          />
          {/* <HorizontalBar
          data={userData}
          width={100}
          height={80}
          options={{
            maintainAspectRatio: true
          }}
        /> */}
        </div>
      </div>
    </>
  );
}
