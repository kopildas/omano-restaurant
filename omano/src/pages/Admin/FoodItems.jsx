import React, { useState } from "react";
import Sidebar from "../../components/admin_comp/Sidebar";
import { MdOutlineAttachMoney, MdOutlineFoodBank } from "react-icons/md";
import OrderSummary from "../../components/admin_comp/OrderSummary";
import Revenu from "../../components/admin_comp/Revenu";
import Add_popup from "../../components/admin_comp/Add_popup";
export default function FoodItems() {
  const [showPop, setShowPop] = useState(false);

  const handleOnClose = () => setShowPop(false);

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
            <Add_popup onClose={handleOnClose} visible={showPop} />
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
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Role
                          </th>
                          <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {/* {people.map(person => ( */}
                        {/* <tr key={person.email}> */}
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  name{" "}
                                </div>
                                <div className="text-sm text-gray-500">
                                  afah@hdsf.com
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">title</div>
                            <div className="text-sm text-gray-500">cse</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className="px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800"
                            >
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {/* {person.role} */}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                        {/* ))} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
