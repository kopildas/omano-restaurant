import React from "react";
import Sidebar from "../../components/admin_comp/Sidebar";
import { getAllUsers } from "../../api";
import { useEffect } from "react";
import { useState } from "react";

export default function Users() {
  const [users, setUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
useEffect(() => {

  getAllUsers().then((data)=> {
    console.log(data);
    setUsers(data);
  })
console.log("holo");
 
}, [])
console.log(users);
console.log("holo");


const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
let currentItems;
if(users)
{
  console.log(users);
  currentItems= users.slice(indexOfFirstItem, indexOfLastItem);
}

const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
};

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow bg-gray-200 p-4">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="bg-gray-100 p-2">
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
                            Email
                          </th>
                          
                          <th
                            scope="col"
                            className="px-6 py-3 text-center text-md font-lg text-gray-800 uppercase tracking-wider"
                          >
                            Edit
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems &&
                          currentItems.map((item) => (
                            <tr key={item.uid}>
                              {/* <tr> */}
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-16 w-16">
                                    <img
                                      className="h-16 w-16 rounded-full"
                                      src={item?.photoURL || `../../../public/images/avtar.jpg`} 
                                      alt=""
                                    />
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-lg font-medium text-gray-900">
                                      {item?.displayName}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                     
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                  {item.email}
                                </div>
                                {/* <div className="text-sm text-gray-500">cse</div> */}
                              </td>
                              
                             
                              <td className="px-6 flex flex-row gap-2 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                                <div
                                  onClick={() => {
                                    // setEditPop(true);
                                    // edited(item);
                                  }}
                                >
                                  Edit
                                </div>
                                <div
                                  className="flex-1 items-end justify-end"
                                  onClick={() => {
                                    // setDeletePop(true);
                                    // edited(item);
                                  }}
                                >
                                  {" "}
                                  delete{" "}
                                </div>
                              </td>
                            </tr>
                          ))}
                        {/* {editPop && editData ? (
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
                        ) : null} */}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Pagination controls */}
        {currentItems ? (<div className="mt-4">
          <ul className="flex justify-center space-x-2">
            {Array.from({ length: Math.ceil(users.length / itemsPerPage) }).map(
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
  );
}
