import React, { useState } from "react";
import Select from "react-tailwindcss-select";

export default function Add_popup({ visible, onClose }) {
  const options = [
    { value: "fox", label: "🦊 Fox" },
    { value: "Butterfly", label: "🦋 Butterfly" },
    { value: "Honeybee", label: "🐝 Honeybee" },
  ];

  const [animal, setAnimal] = useState(null);

  const handleChange = (value) => {
    console.log("value:", value);
    setAnimal(value);
  };
  
  const handleOnChange = (e) => {
    if (e.target.id === "cont" || e.target.id === "close") {
      onClose();
    }
  };

  const [formData,setFormdata] = useState({
    item_name:""
  })

  const {item_name} = formData;
  console.log(item_name);
  const onChange = () => {
    
  }


  if (!visible) return null;
  return (
    <div
      id="cont"
      onClick={handleOnChange}
      className="fixed inset-0 k bg-opacity-5 backdrop-blur-sm flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg w-5/12">
        <h1 className="font-semibold text-center text-xl text-gray-700 mb-5">
          Add New Items
        </h1>

        <form>
          <div className="flex">
            <div className="p-1 grid grid-cols-2 gap-4">
              <label className="text text-sm font-semibold">
                Item Name
                <input
                  type="text"
                  className="border border-gray-700 p-2 rounded mb-5"
                  placeholder=""
                  // value={item_name}
                />
              </label>

              <label className="text text-sm font-semibold">
                Sale
                <input
                  type="text"
                  className=" border border-gray-700 p-2 rounded mb-5"
                  placeholder="12"
                />
              </label>
            </div>
          </div>

          <div className="flex">
            <div className="p-1 grid grid-cols-2 gap-4">
              <label className="text text-sm font-semibold">
                PRICE
                <input
                  type="number"
                  className="border border-gray-700 p-2 rounded mb-5"
                  placeholder="$12.6"
                />
              </label>
              <label className="text text-sm font-semibold">
                CATEGORY
              <Select
                value={animal}
                onChange={handleChange}
                options={options}
              />
              </label>
            </div>
          </div>


          <div className="text text-sm">
            <p>Images</p>
            <p className="mb-1 font-normal">The first image will be the cover (max 6)</p>
            <input type="file"
            id="iamges"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required 
            className="font-semibold px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 mb-4"/>
          </div>

        </form>

        <div className="text-center flex items-end justify-end">
          <button id="close" onClick={handleOnChange} className="px-3 py-0 mr-4 bg-red-600 hover:bg-red-700 duration-150 ease-in-out text-white rounded text-lg">
            Close
          </button>
          <button className="px-3 py-0 bg-green-600 hover:bg-green-700 duration-150 ease-in-out text-white rounded text-lg">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
