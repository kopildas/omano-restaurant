import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
  } from "firebase/storage";
  import React, { useState } from "react";
  import Select from "react-tailwindcss-select";
  import { toast } from "react-toastify";
  import Spinner from "../Spinner";
  
  import { getAuth } from "firebase/auth";
  import { MdDeleteForever } from "react-icons/md";
  import { storage } from "../../firebase";
  import { deleteItem } from "../../utils/firebaseFunctions";
import { deleteProduct } from "../../api";
  

  
  export default function Delete_popup({ data, visible, onClose, addDataNotifi }) {
    const auth = getAuth();
    const user = auth.currentUser;
  
    console.log(data);
  
    
  
    const [loading, setLoading] = useState(false);
    const [fileLoading, setFileLoading] = useState(false);
   

  
    const handleOnChange = (e) => {
      if (e.target.id === "cont" || e.target.id === "close") {
        onClose();
      }
    };
  
 
  

  

  
    /**
     * The function handles the onChange event for an input element, updating the form data based on the
     * selected files or the value of the input element.
     */
    const onChange = () => {
     
  
      //data saving method calling
      // await setDoc(doc(db, "foodItems", `${Date.now()}`), formData);
      // saveItem(formData);]
      // deleteItem(data.id)
      deleteProduct(data.id)
      setTimeout(() => {
        setLoading(false);
      }, 2000);
  
      // Include the selected foods category in the formData object
      // const updatedFormData = {
      //   ...formData,
      //   category: foods?.value || "", // If no foods is selected, default to an empty string
      // };
  
      // // Now you can use the updatedFormData as needed
      // console.log("Updated FormData:", updatedFormData);
      // console.log(formData);
  
      // Perform any further actions, such as sending the data to an API
  
      // Reset the form data
     
  
      //sending notification via props to perent
      addDataNotifi();
      // Close the popup
      onClose();
      toast.success("Item has been deleted successfully");
    }
  
    
  
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
        <div className="w-5/12 p-4 bg-slate-100 rounded-lg md:p-6">
          <h1 className="text-xl font-semibold text-center text-gray-700 md-5">
           Are you sure to Delete Item ({data.item_name})?
          </h1>
  
          
        
  
            <div className="flex items-end justify-end m-3 text-center">
              <button
                id="close"
                onClick={handleOnChange}
                className="px-3 py-0 mr-4 text-lg text-white duration-150 ease-in-out bg-green-600 rounded hover:bg-green-700"
              >
                Close
              </button>
              <button
                
                onClick={onChange}
                className="px-3 py-0 text-lg text-white duration-150 ease-in-out bg-red-600 rounded hover:bg-red-700"
              >
                Delete Item
              </button>
            </div>
       
        </div>
      </div>
    );
  }
  