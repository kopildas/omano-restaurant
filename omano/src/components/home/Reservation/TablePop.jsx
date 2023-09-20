import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import Select from "react-tailwindcss-select";
import { toast } from "react-toastify";
import Spinner from "../../Spinner";
import { add, format } from "date-fns";
import { getAuth } from "firebase/auth";
import {
  getAllReservationData,
  saveTableResrv,
} from "../../../utils/firebaseFunctions";

export default function TablePop({
  onDateSelect,
  justdate,
  visible,
  onClose,
  timeRange,
  selectDate,
  selectedTime,
}) {
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [tableData, setTableData] = useState([
    { id: "table1", name: "Table 1" },
    { id: "table2", name: "Table 2" },
    { id: "table3", name: "Table 3" },
    { id: "table4", name: "Table 4" },
    { id: "table5", name: "Table 5" },
    { id: "table6", name: "Table 6" },
  ]);
  const [prevTableId, setPrevTableId] = useState(null);
  const [time, setTime] = useState(selectedTime);
  const [databaseReserv, setDatabaseReserv] = useState([]);
  const newdata = (data) => setDatabaseReserv(data);
  const [filter, setFilter] = useState(selectedTime);

console.log(selectedTime);
console.log(filter);
  let filteredData;
  useEffect(() => {
    getAllReservationData().then(newdata);
  }, [time]);

  if (selectDate.justdate != null) {
    filteredData = databaseReserv.filter(
      (item) => item.date === format(selectDate.justdate, "yyyy-MM-dd")
    );
  }

  if (time != null) {
    filteredData = filteredData.filter((item) => item.time === time);
  }

  useEffect(() => {
    setTime(selectedTime);
  }, [selectedTime]);

  const auth = getAuth();
  const [resvData, setResvData] = useState({
    time: selectedTime,
  });

  useEffect(() => {
    if (selectDate.justdate)
      setResvData((prev) => ({
        ...prev,
        time: selectedTime,
        date: format(selectDate.justdate, "yyyy-MM-dd"),
      }));
  }, [selectDate.justdate, selectedTime]);

  useEffect(() => {
    if (auth.currentUser)
      setResvData((prev) => ({
        ...prev,
        user: auth.currentUser.displayName,
        userEmail: auth.currentUser.email,
      }));
  }, [auth]);

  const handleOnChange = (e) => {
    if (e.target.id === "cont" || e.target.id === "close") {
      onClose();
    }
  };

  const bookingTable = (tableId, tableName) => {
    if (isTableAvailable(tableId)) {
      if (prevTableId !== null && isTableAvailable(prevTableId)) {
        const prevTableElement = document.getElementById(prevTableId);
        prevTableElement.classList.remove("table-selected");
      }

      const tableElement = document.getElementById(tableId);
      tableElement.classList.add("table-selected");

      setResvData((prev) => ({
        ...prev,
        table: tableId,
        tableName: tableName,
      }));

      setPrevTableId(tableId);
    }
  };

  const handleConfiremClick = () => {
    if (resvData.table) {
      saveTableResrv(resvData, resvData.user, resvData.table);
    }

    onClose();
  };

  const isTableAvailable = (tableId) => {
    return !filteredData.some((item) => item.table === tableId);
  };

  useEffect(() => {
    if (visible) {
      setPrevTableId(null);
      const tableElements = document.querySelectorAll(".table-div");
      tableElements.forEach((tableElement) => {
        const tableId = tableElement.id;
        const availableClass = isTableAvailable(tableId)
          ? "table-available"
          : "table-booked";
        tableElement.classList.remove("table-available", "table-booked", "table-selected");
        tableElement.classList.add(availableClass);

        // Check if the table is booked and display the name
        const bookedTable = filteredData.find((item) => item.table === tableId);
        if (bookedTable) {
          const tableNameElement = tableElement.querySelector(".table-name");
          if (tableNameElement) {
            tableNameElement.textContent = `Booked by: ${bookedTable.name}`;
          }
        }
      });
    }
  }, [visible]);

  if (loading) {
    return <Spinner />;
  }

  if (
    (visible && timeRange === null) ||
    selectedTime === null ||
    selectDate.justdate === null
  )
    return handleOnChange;

  if (
    !visible ||
    timeRange === null ||
    selectedTime === null ||
    selectDate.justdate === null
  )
    return null;

  return (
    <div
      id="cont"
      onClick={handleOnChange}
      className="fixed z-50 inset-0 flex items-center justify-center k bg-opacity-5 backdrop-blur-sm bg-slate-500"
    >
      <div className="p-5 w-3/4 rounded-md flex-row gap-5 items-center justify-center bg-slate-900 h-3/4 ">
        <div className="flex items-center justify-center">
          <p className="text text-4xl text-white font-semibold">Book a table</p>
        </div>
        <div className="flex flex-col md:flex-row md:grid-rows-2">
          <div className="md:flex-1 w-full md:w-1/5 flex-row md:flex-col bg-gray-500 rounded-lg h-20 mt-10 md:mt-0">
            <p className="flex items-center justify-center ">Todays available</p>
            <p className="flex items-center justify-center "> Time slot</p>
            <div className="p-5 flex md:flex-1 flex-row md:flex-col gap-2 w-full bg-slate-900 max-h-20 md:max-h-96 overflow-x-auto md:overflow-y-auto scrollbar-none">
              {timeRange &&
                timeRange.map((time) => (
                  <div
                    key={time.value}
                    value={time.value}
                    className=" text-gray-700 "
                    onClick={() => setFilter(time.value)}
                  >
                    <p
                      className={` ${
                        filter  === time.value ? "bg-slate-700 text-white" : "bg-slate-300"
                      } hover:bg-slate-500 p-1 border-b border-b-slate-950 w-20 md:w-full flex items-center justify-center rounded-lg`}
                      onClick={() => setTime(time.value)}
                    >
                      {time.label}
                    </p>
                  </div>
                ))}
            </div>
          </div>
          <div className="md:flex-4 w-4/5 gap-4 mt-14 md:mt-5 ">
            <div>
              <div className="flex flex-col items-start justify-start md:items-end md:justify-end p-3 md:flex-row md:gap-6">
                <div className="flex flex-row gap-2 items-center justify-evenly">
                  <div className="w-5 h-5 rounded-full bg-green-800">
                    
                  </div>
                <p className="text text-white">available</p>
                </div>
                <div className="flex flex-row gap-2 items-center justify-evenly">
                  <div className="w-5 h-5 rounded-full bg-red-800">
                    
                  </div>
                <p className="text text-white">booked at this time</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:flex-wrap md:gap-0 gap-1 p-5 w-96 h-[250px] md:w-[800px] overflow-y-auto scrollbar-none">
                {tableData.map((table) => (
                  <div className="w-1/3 px-1 mb-4" key={table.id}>
                    <div
                      id={table.id}
                      className={` flex flex-col md:flex-row items-center justify-end w-52 h-20 bg-slate-600  rounded-xl ${
                        isTableAvailable(table.id)
                          ? "hover:bg-slate-800 transition ease-in-out"
                          : "bg-slate-800 text-slate-500"
                      } `}
                      onClick={() => bookingTable(table.id, table.name)}
                    >
                      <p className="flex-1 items-center justify-center p-2 text-sm">
                        {table.name} <br />
                        {isTableAvailable(table.id)
                          ? "Available"
                          : `Booked by: ${filteredData.find(
                              (item) => item.table === table.id
                            )?.user || ""}`}
                      </p>
                      <div  id={table.id} className={`table-div ${
                        isTableAvailable(table.id)
                          ? "table-available"
                          : "table-booked"
                      } bg-white w-full md:w-10 rounded-e-xl h-full text text-cyan-700 items-end justify-end `}>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" flex items-center justify-center md:items-end md:justify-end mt-4 md:mt-10 ml-14 md:ml-0">
              <button
                onClick={onClose}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4"
              >
                Close
              </button>
              <button
                onClick={handleConfiremClick}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
