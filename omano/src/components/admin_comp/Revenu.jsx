import React, { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { category } from "../../components/admin_comp/Add_popup";
import { Pie,Doughnut } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

export default function Revenu() {
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
      <div className="bg-slate-300 px-6 py-6 rounded-md">
        <div>
          <p className="font font-semibold text-2xl">Food Category</p>
          <p>fasfjaskjf kajksjfahsf</p>
          <div className="flex p-5 mt-2 bg-white/30  backdrop-blur-sm items-center justify-center rounded-lg">
            <div className="flex items-center justify-center w-[400px] h-[400px] ">
              <Doughnut data={userData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
