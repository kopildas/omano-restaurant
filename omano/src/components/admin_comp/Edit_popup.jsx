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
import { editItem, saveItem } from "../../utils/firebaseFunctions";

export const category = [
  { value: "Fast Food", label: "../public/images/burg.png" },
  { value: "Biriyani", label: "../public/images/lunch.png" },
  { value: "Pasta", label: "../public/images/dinner.png" },
  { value: "Chicken", label: "../public/images/chicken.png" },
  { value: "Drink & Juice", label: "../public/images/juice.png" },
  { value: "Ice-Cream", label: "../public/images/ice.png" },
];

export default function Edit_popup({ data, visible, onClose, addDataNotifi }) {
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(data);

  const options = [
    { value: "Fast Food", label: "🍔 Fast Food" },
    { value: "Chicken", label: "🍗 Chicken" },
    { value: "Biriyani", label: "🍚 Biriyani" },
    { value: "Pasta", label: "🍝 Pasta" },
    { value: "Icecream", label: "🍦Ice-Cream" },
    { value: "Drinks", label: "🍹Drinks & Juice" },
  ];

  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [foods, SetFoods] = useState(null);
  let [formData, setFormData] = useState({
    item_name: data.item_name,
    sale: data.sale,
    price: data.price,
    category: data.category,
    quantity: 1,
    cartORadd: "cart",
    images: data.images,
  });
  const { item_name, sale, price, category, images, quantity } = formData;

  const handleChange = (value) => {
    console.log(value);
    SetFoods(value);
    setFormData((prevState) => ({
      ...prevState,
      category: foods?.value || "",
    }));

    console.log(category);
  };

  const handleOnChange = (e) => {
    if (e.target.id === "cont" || e.target.id === "close") {
      onClose();
    }
  };

  console.log(category);

  const uploadImage = (e) => {
    console.log("dfas");
    setFileLoading(true);
    setFormData((prevState) => ({
      ...prevState,
      images: e.target.files[0],
    }));
    console.log(e.target.files[0]);

    const imagesFile = e.target.files[0];
    const storageRef = ref(storage, `/Images/${Date.now()}-${imagesFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imagesFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (err) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log(downloadURL);
            setFormData((prevState) => ({
              ...prevState,
              images: downloadURL,
            }));
            setFileLoading(false);
            toast.success("Image uploaded successfully");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  const delImage = () => {
    if (user) {
      // setFileLoading(true);
      console.log("holo");
      console.log(images);
      const decodedUrl = decodeURIComponent(images);
      const pathStartIndex = decodedUrl.indexOf("/o/") + 3; // Adding 3 to exclude '/o/'
      const pathEndIndex = decodedUrl.indexOf("?"); // Find the end of the path
      const imagePath = decodedUrl.slice(pathStartIndex, pathEndIndex);

      console.log(imagePath);
      const deletRef = ref(storage, images);
      console.log(deletRef);
      deleteObject(deletRef)
        .then(() => {
          // setFormData((prevState) => ({
          // ...prevState,
          //   images: "",
          // }));
          console.log("del holo");
          setFileLoading(false);
          toast.error("Image deleted successfully");
        })
        .catch((error) => {
          console.log(error);
        });
     
    }
  };

  /**
   * The function handles the onChange event for an input element, updating the form data based on the
   * selected files or the value of the input element.
   */
  function onChange(e) {
    if (!e.target.files) {
      console.log("yooh");
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
    }
    console.log(formData.category);
  }
  formData = {
    ...formData,
    category: foods?.value || data.category, // If no foods is selected, default to an empty string
  };
  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    console.log(images);

    // console.log(updatedFormData);
    console.log(formData.category);
    if (!item_name || !sale || !price || !formData.category || !images) {
      console.log(item_name);
      console.log(sale);
      console.log(price);
      console.log(formData.category);
      console.log(images);
      setLoading(false);
      toast.error("Please fill all the fields");
      return;
    }

    //data saving method calling
    // await setDoc(doc(db, "foodItems", `${Date.now()}`), formData);
    // saveItem(formData);
   editItem(formData, data.id)
    console.log("kire");
    console.log(formData);
    setTimeout(() => {
      setLoading(false);
      addDataNotifi();
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
    setFormData({
      item_name: "",
      sale: "",
      price: "",
      category: "",
    });
    SetFoods(null);

    //sending notification via props to perent
    // Close the popup
    onClose();
    toast.success("Item has been uploaded successfully");
  }

  console.log(formData);

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
      <div className="w-5/12 p-4 bg-white rounded-lg md:p-6">
        <h1 className="text-xl font-semibold text-center text-gray-700 md-5">
          Add New Items
        </h1>

        <form onSubmit={onSubmit}>
          <div className="md:flex">
            <div className="grid grid-cols-1 md:p-1 md:grid-cols-2 md:gap-4">
              <label className="text-sm font-semibold text">
                Item Name
                <input
                  type="text"
                  className="p-2 border border-gray-700 rounded md-5"
                  placeholder=""
                  id="item_name"
                  value={item_name}
                  onChange={onChange}
                  required
                />
              </label>

              <label className="text-sm font-semibold text">
                Sale
                <input
                  type="text"
                  className="p-2 border border-gray-700 rounded md-5"
                  placeholder="12"
                  id="sale"
                  value={sale}
                  onChange={onChange}
                  required
                />
              </label>
            </div>
          </div>

          <div className="md:flex">
            <div className="grid p-1 md:grid-cols-2 md:gap-4">
              <label className="text-sm font-semibold text">
                PRICE
                <input
                  type="number"
                  className="p-2 border border-gray-700 rounded md-5"
                  placeholder="$12.6"
                  id="price"
                  value={price}
                  onChange={onChange}
                  required
                />
              </label>
              <label className="text-sm font-semibold text">
                CATEGORY
                <Select
                  required
                  options={options}
                  id="foods"
                  value={foods}
                  onChange={handleChange}
                  // onChange={onChange}
                />
              </label>
            </div>
          </div>

          <div className="text-sm text">
            <p>Images</p>
            <p className="font-normal md-1">
              The first image will be the cover (max 6)
            </p>
            <div className="flex gap-2">
              <input
                type="file"
                id="images"
                onChange={uploadImage}
                accept=".jpg,.png,.jpeg"
                // required
                className="font-semibold md:px-3 md:py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 md-4 w-full md:w-1/2"
              />
            </div>
            <div className="text text-4xl">
              <div className="flex h-64 w-64 ">
                <img
                  className="h-64 w-64 absolute "
                  src={images}
                  alt=""
                />
                {images ? (
                  <MdDeleteForever
                    className="relative text-6xl flex items-center justify-center cursor-pointer"
                    onClick={delImage}
                  />
                ) : null}
              </div>
            </div>
            {fileLoading ? <Spinner /> : null}
          </div>

          <div className="flex items-end justify-end text-center">
            <button
              id="close"
              onClick={handleOnChange}
              className="px-3 py-0 mr-4 text-lg text-white duration-150 ease-in-out bg-red-600 rounded hover:bg-red-700"
            >
              Close
            </button>
            <button
              type="submit"
              className="px-3 py-0 text-lg text-white duration-150 ease-in-out bg-green-600 rounded hover:bg-green-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
