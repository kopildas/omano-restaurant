import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import Select from "react-tailwindcss-select";
import { toast } from "react-toastify";
import Spinner from "../../Spinner";
import ReactCalender from "react-calendar";

export default function Calender({
  onDateSelect,
  visible,
  onClose,
  addDataNotifi,
}) {
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [date, setDate] = useState({
    justdate: null,
    dateTime: null,
  });
  console.log(date.justdate);

  const handleOnChange = (e) => {
    if (e.target.id === "cont" || e.target.id === "close" || date.justdate) {
      // console.log(e);
      console.log("jji");
      onClose();
    }
  };

  const handleCalendarClick = (date) => {
    console.log(date);
    setDate((prev) => ({ ...prev, justdate: date }));

    if (date) {
      onDateSelect(date)
      onClose();
    }
  };

  /**
   * The function handles the onChange event for an input element, updating the form data based on the
   * selected files or the value of the input element.
   */
  // const onChange = () => {

  //   //data saving method calling
  //   // await setDoc(doc(db, "foodItems", `${Date.now()}`), formData);
  //   // saveItem(formData);]
  //   deleteItem(data.id)

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   // Include the selected foods category in the formData object
  //   // const updatedFormData = {
  //   //   ...formData,
  //   //   category: foods?.value || "", // If no foods is selected, default to an empty string
  //   // };

  //   // // Now you can use the updatedFormData as needed
  //   // console.log("Updated FormData:", updatedFormData);
  //   // console.log(formData);

  //   // Perform any further actions, such as sending the data to an API

  //   // Reset the form data

  //   //sending notification via props to perent
  //   addDataNotifi();
  //   // Close the popup
  //   onClose();
  //   toast.success("Item has been deleted successfully");
  // }

  if (loading) {
    return <Spinner />;
  }
  if (!visible) return null;
  return (
    <div
      id=""
      onClick={handleOnChange}
      className="fixed z-50 inset-0 flex items-center justify-center bg-opacity-5 backdrop-blur-sm"
    >
      <div className=" p-2 w-80 md:min-w-[500px] bg-slate-300 rounded-lg md:">
        <h1 className="text-xl font-semibold text-center text-gray-700 md-5">Choose a date
          {/* Are you sure to Delete Item ({data.item_name})? */}
        </h1>

        <div className="flex items-end justify-end m-3 text-center">
          <ReactCalender
            minDate={new Date()}
            className="REACT-CALENDER p-2 bg-slate-200"
            view="month"
            //   onClick={handleOnChange}
            onClickDay={handleCalendarClick}
          />
          {/* {date.justdate ? onDateSelect(date) : null} */}
          {/* {date.justdate ? handleOnChange : null} */}
        </div>
      </div>
    </div>
  );
}
