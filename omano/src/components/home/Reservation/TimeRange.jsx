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
import { add, format } from "date-fns"; 
  
  export default function TimeRange({
    onDateSelect,
    justdate,
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
    console.log(justdate);
   
    const getTimeRange = () => {
        // beginning and end will be fatch from time slot datatabel
        const beginning = add(justdate, {hours : 9})
        const end = add(justdate, {hours : 17})
        const interval = 30

        const times = []
        for(let i = beginning; i<=end ; i= add(i, {minutes:interval}))
        {
            times.push(i)
        }
        return times
    }

    const times = getTimeRange()


  
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
  
   
  
    if (loading) {
      return <Spinner />;
    }
    if (!visible) return null;
    return (
      <div
        id="cont"
        onClick={handleOnChange}
        className="fixed z-50 inset-0 flex items-center justify-center k bg-opacity-5 backdrop-blur-sm"
      >
        <div className="flex h-screen flex-col items-center justify-center">
            <div className="flex gap-4">
                {times.map((time,i) => (
                    <div key={`item-${i}`} className="rounded-sm bg-gray-200 p-2">
                        <button type="button">{format(time, 'kk-mm')}</button>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
  }
  