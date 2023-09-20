import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin_comp/Sidebar";
import { MdOutlineAttachMoney, MdOutlineFoodBank } from "react-icons/md";
import OrderSummary from "../../components/admin_comp/OrderSummary";
import Revenu from "../../components/admin_comp/Revenu";
import Add_popup from "../../components/admin_comp/Add_popup";
import { useStateValue } from "../../context/StateProvider";

import { getAllFoodItems } from "../../utils/firebaseFunctions";
import Edit_popup from "../../components/admin_comp/Edit_popup";
import Delete_popup from "../../components/admin_comp/Delete_popup";
import { getAllProduct } from "../../api";

export default function FoodItems() {
  const [showPop, setShowPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [deletePop, setDeletePop] = useState(false);

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
let currentItems =null;
if(foods)
{
  currentItems = foods.slice(indexOfFirstItem, indexOfLastItem);
}

const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};



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
        {foods ? (<div className="mt-4">
          <ul className="flex justify-center space-x-2">
            {Array.from({ length: Math.ceil(foods.length / itemsPerPage) }).map(
              (_, index) => (
                <li
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`cursor-pointer px-3 py-1 rounded-full hover:bg-gray-300 ${
                    currentPage === index + 1 ? "bg-gray-300" : ""
                  }`}
                >
                  {index + 1}
                </li>
              )
            )}
          </ul>
        </div>) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


// uid: '5QX89PwQ3HhdhGwyH190EmfOSzb2',
//       email: 'kopildas451@gmail.com',
//       emailVerified: true,
//       displayName: 'Kopil Das',
//       photoURL: 
//         'https://lh3.googleusercontent.com/a/AAcHTte064rxcazfu2Vn2ZTD0MX0NKa8pUJmSsNpseOczAMCtis=s96-c',
//       disabled: fals