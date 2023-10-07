import React, { useEffect, useState } from "react";
import { deleteUserUid, getAllUsers } from "../../api";
import Spinner from "../../components/Spinner";
import Edit_user_pop from "../../components/admin_comp/Edit_user_pop";
import Sidebar from "../../components/admin_comp/Sidebar";

export default function Users() {
  const [users, setUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  let [dele, setDele] = useState(true);
  let [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  const [showPop, setShowPop] = useState(false);
  const [editPop, setEditPop] = useState(false);
  const [deletePop, setDeletePop] = useState(false);

  const [editData, setEditData] = useState(null);

  const edited = (itemdata) => {
    setEditData(itemdata);
  };

  useEffect(() => {
    getAllUsers().then((data) => {
      console.log(data);
      setUsers(data);
    });
    console.log("holo");
  }, []);
  console.log(users);
  console.log("holo");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems;
  if (users) {
    console.log(users);
    currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handledelete = async (useruid) => {
    console.log(useruid);
    setLoading(true);
    try {
      await deleteUserUid(useruid);
      // After successfully deleting the user, update the users data
      getAllUsers().then((data) => {
        console.log(data);
        setUsers(data);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.error("Error deleting user:", error);
    }
  };

  // useEffect(() => {

  //   getAllUsers().then((data)=> {
  //     console.log(data);
  //     setUsers(data);
  //   })
  // console.log("holo");

  // }, [dele])
  if (loading) {
    return <Spinner />;
  }
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
                                    src={
                                      item?.photoURL ||
                                      `../../../public/images/avtar.jpg`
                                    }
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-lg font-medium text-gray-900">
                                    {item?.displayName}
                                  </div>
                                  <div className="text-sm text-gray-500"></div>
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
                                  setEditPop(true);
                                  edited(item);
                                }}
                              >
                                Edit
                              </div>
                              <div
                                className="flex-1 items-end justify-end"
                                onClick={() => {
                                  // setDeletePop(true);
                                  // edited(item);
                                  handledelete(item.uid);
                                }}
                              >
                                {" "}
                                delete{" "}
                              </div>
                            </td>
                          </tr>
                        ))}
                      {editPop && editData ? (
                        <Edit_user_pop
                          addDataNotifi={addingNewData}
                          onClose={handleOnClose}
                          visible={editPop}
                          data={editData}
                        />
                      ) : null}

                      {/* {deletePop && editData ? (
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
              {currentItems ? (
                <div className="mt-4">
                  <ul className="flex justify-center space-x-2">
                    {Array.from({
                      length: Math.ceil(users.length / itemsPerPage),
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
  );
}

// [
//   {
//     uid: '5QX89PwQ3HhdhGwyH190EmfOSzb2',
//     email: 'kopildas451@gmail.com',
//     emailVerified: true,
//     displayName: 'Kopil Das',
//     photoURL:
//       'https://lh3.googleusercontent.com/a/AAcHTte064rxcazfu2Vn2ZTD0MX0NKa8pUJmSsNpseOczAMCtis=s96-c',
//     disabled: false,
//     metadata: {
//       lastSignInTime: 'Thu, 21 Sep 2023 19:08:46 GMT',
//       creationTime: 'Thu, 06 Jul 2023 19:59:01 GMT',
//       lastRefreshTime: 'Sun, 24 Sep 2023 15:32:13 GMT'
//     },
//     tokensValidAfterTime: 'Thu, 06 Jul 2023 19:59:01 GMT',
//     providerData: [
//       {
//         uid: '104745337652789971749',
//         displayName: 'Kopil Das',
//         email: 'kopildas451@gmail.com',
//         photoURL:
//           'https://lh3.googleusercontent.com/a/ACg8ocJXj4aFx0C59f8_zKZGm2IdoDogccH5XAK7JjLMK4Fwqbc=s96-c',
//         providerId: 'google.com'
//       }
//     ]
//   },
//   {
//     uid: 'ILJMuj3h37PkRGbHZPSuB9OXMBq2',
//     email: 'kopa.dev@gmail.com',
//     emailVerified: true,
//     displayName: 'Kopil',
//     photoURL:
//       'https://lh3.googleusercontent.com/a/ACg8ocJ9QX6kg1dU2fhNWzIc5qAyXjdxzSaRmW6UaOdv47Oj=s96-c',
//     disabled: false,
//     metadata: {
//       lastSignInTime: 'Thu, 21 Sep 2023 12:50:08 GMT',
//       creationTime: 'Sun, 10 Sep 2023 16:43:26 GMT',
//       lastRefreshTime: 'Thu, 21 Sep 2023 12:50:08 GMT'
//     },
//     tokensValidAfterTime: 'Sun, 10 Sep 2023 16:43:26 GMT',
//     providerData: [
//       {
//         uid: '118053156747929996703',
//         displayName: 'Kopil',
//         email: 'kopa.dev@gmail.com',
//         photoURL:
//           'https://lh3.googleusercontent.com/a/ACg8ocJ9QX6kg1dU2fhNWzIc5qAyXjdxzSaRmW6UaOdv47Oj=s96-c',
//         providerId: 'google.com'
//       }
//     ]
//   },
//   {
//     uid: 'pkNAS7TuR4Um8PaTiED1yEzYWC33',
//     email: 'piratekopil87@gmail.com',
//     emailVerified: true,
//     displayName: 'Kopil Das',
//     photoURL:
//       'https://lh3.googleusercontent.com/a/AAcHTtdDmTvskLs6_r6DKC58e8JJhs0H88TwSpgqkZ9UinbCxY4=s96-c',
//     disabled: false,
//     metadata: {
//       lastSignInTime: 'Thu, 21 Sep 2023 09:57:44 GMT',
//       creationTime: 'Thu, 06 Jul 2023 17:56:54 GMT',
//       lastRefreshTime: 'Thu, 21 Sep 2023 18:13:08 GMT'
//     },
//     tokensValidAfterTime: 'Sun, 27 Aug 2023 06:49:39 GMT',
//     providerData: [
//       {
//         uid: '113740511767345668839',
//         displayName: 'Kopil Das',
//         email: 'piratekopil87@gmail.com',
//         photoURL:
//           'https://lh3.googleusercontent.com/a/ACg8ocIeOg_u_p_MgM_9f9c7KIzl9idQL_xcHplAa8M2HjEuiAo=s96-c',
//         providerId: 'google.com'
//       }
//     ]
//   }
// ]
