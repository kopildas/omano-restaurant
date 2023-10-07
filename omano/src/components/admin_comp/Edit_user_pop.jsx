import React from 'react'
import Spinner from '../Spinner';

export default function Edit_user_pop({ data, visible, onClose, addDataNotifi }) {
    const [loading, setLoading] = useState(false);
    let [formData, setFormData] = useState({
        user_name: data.displayName,
        email: data.email,
        photoURL: data.photoURL || null,
      });
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
                Name
                <input
                  type="text"
                  className="p-2 border border-gray-700 rounded md-5"
                  placeholder=""
                  id="item_name"
                  value={user_name}
                  onChange={onChange}
                  required
                />
              </label>

              <label className="text-sm font-semibold text">
                Email
                <input
                  type="text"
                  className="p-2 border border-gray-700 rounded md-5"
                  placeholder="12"
                  id="sale"
                  value={email}
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
  )
}
