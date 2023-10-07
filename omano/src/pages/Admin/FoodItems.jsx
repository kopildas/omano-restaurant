import React, { useEffect, useState } from "react";
import Add_popup from "../../components/admin_comp/Add_popup";
import Sidebar from "../../components/admin_comp/Sidebar";
import { useStateValue } from "../../context/StateProvider";

import { getAllProduct } from "../../api";
import Delete_popup from "../../components/admin_comp/Delete_popup";
import Edit_popup from "../../components/admin_comp/Edit_popup";
import { editItem } from "../../utils/firebaseFunctions";
import Spinner from "../../components/Spinner";

export default function FoodItems() {
  const [showPop, setShowPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [deletePop, setDeletePop] = useState(false);
  let [loading, setLoading] = useState(false);

  const [editData, setEditData] = useState(null);

  const [{ cartItems, foodItem }, dispatch] = useStateValue();

  const [addData, setAddData] = useState(true);
  const newdata = (data) => setFoods(data);
  const [foods, setFoods] = useState(foodItem);

  console.log(foods);

  const addingNewData = () => setAddData(!addData);

  const handleOnClose = () => {
    setShowPop(false);
    setEditPop(false);
    setDeletePop(false);
  };

  const edited = (itemdata) => {
    setEditData(itemdata);
  };
  console.log(editData);

  useEffect(() => {
    getAllProduct().then(newdata);
    console.log(addData);
  }, [addData]);

  // Log foods only when it changes
  useEffect(() => {
    console.log(foods);
  }, [foods]);

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems = null;
  if (foods) {
    currentItems = foods.slice(indexOfFirstItem, indexOfLastItem);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [isChecked, setIsChecked] = useState(false);
  


  const handleChange = (id) => {
    setLoading(true);

    setIsChecked((prev) => !prev);
    console.log(isChecked);
    console.log(id);

    // Find the index of the item in the foods array
    const index = foods.findIndex((item) => item.id === id);

    if (index !== -1) {
      // Create a copy of the item to update
      const updatedItem = { ...foods[index] };

      // Update the feature property of the item
      updatedItem.feature = !isChecked;
      console.log(isChecked);
      // Create a copy of the foods array to update
      const updatedFoods = [...foods];
      console.log(updatedItem);
      // Update the item in the copied foods array
      updatedFoods[index] = updatedItem;

      // Update the state with the new foods array
      setFoods(updatedFoods);

      editItem(updatedItem, id);
      console.log("kire");
      // console.log(formData);
      setTimeout(() => {
        setLoading(false);
        addingNewData;
      }, 2000);
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow bg-gray-200 p-4">
          <div className="flex-col text text-3xl font-bold py-2">
            <h2 className="text-4xl font-semibold mb-1">Food Items</h2>
            <button
              onClick={() => setShowPop(true)}
              type=""
              className="font-normal text-lg bg-emerald-400 rounded-xl hover:bg-emerald-600 w-28 mb-4"
            >
              Add new
            </button>
            <Add_popup
              addDataNotifi={addingNewData}
              onClose={handleOnClose}
              visible={showPop}
            />
          </div>
          <div className="bg-gray-100 p-2">
            {/* Add more content here */}

            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-md font-lg text-gray-800 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-md font-lg text-gray-800 uppercase tracking-wider"
                          >
                            Category
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-md font-lg text-gray-800 uppercase tracking-wider"
                          >
                            Sale
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-md font-lg text-gray-800 uppercase tracking-wider"
                          >
                            PRICE
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-md font-lg text-gray-800 uppercase tracking-wider"
                          >
                            Edit
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-md font-lg text-gray-800 uppercase tracking-wider"
                          >
                            Feature
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems &&
                          currentItems.map((item) => (
                            <tr key={item.email}>
                              {/* <tr> */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-16 w-16">
                                    <img
                                      className="h-16 w-16 rounded-full"
                                      src={item?.images}
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {item?.item_name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {item?.id}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.category}
                                </div>
                                {/* <div className="text-sm text-gray-500">cse</div> */}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
                                >
                                  {item.sale}
                                </span>
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                $ {item.price}
                              </td>
                              <td className="px-6 flex flex-row gap-2 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                <div
                                  onClick={() => {
                                    setEditPop(true);
                                    edited(item);
                                  }}
                                >
                                  Edit
                                </div>
                                <div
                                  className="flex-1 items-end justify-end"
                                  onClick={() => {
                                    setDeletePop(true);
                                    edited(item);
                                  }}
                                >
                                  {" "}
                                  delete{" "}
                                </div>
                              </td>

                              <td>
                                <div className="flex justify-center items-center">
                                  <div className="btn-status">
                                    <input
                                      type="checkbox"
                                      name="checkbox"
                                      id="checkbox"
                                      className={`${
                                        item.feature ? "text-green-500" : ""
                                      } mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(195, 31, 31, 0.2),_0_2px_2px_0_rgba(94, 206, 129, 0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(210, 32, 32, 0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#50ed20]`}
                                      checked={item.feature}
                                      onChange={() =>
                                        handleChange(item.id, item.feature)
                                      }
                                    />
                                    <label
                                      htmlFor="checkbox"
                                      className={`btn-change flex items-center p-1 rounded-lg w-12 h-6 cursor-pointer`}
                                    ></label>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        {editPop && editData ? (
                          <Edit_popup
                            addDataNotifi={addingNewData}
                            onClose={handleOnClose}
                            visible={editPop}
                            data={editData}
                          />
                        ) : null}

                        {deletePop && editData ? (
                          <Delete_popup
                            addDataNotifi={addingNewData}
                            onClose={handleOnClose}
                            visible={deletePop}
                            data={editData}
                          />
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Pagination controls */}
                {foods ? (
                  <div className="mt-4">
                    <ul className="flex justify-center space-x-2">
                      {Array.from({
                        length: Math.ceil(foods.length / itemsPerPage),
                      }).map((_, index) => (
                        <li
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className={`cursor-pointer px-3 py-1 rounded-full hover:bg-gray-300 ${
                            currentPage === index + 1 ? "bg-gray-300" : ""
                          }`}
                        >
                          {index + 1}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

