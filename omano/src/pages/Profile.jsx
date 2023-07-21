import { getAuth, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase";






export default function Profile() {
  const auth = getAuth();
  console.log(auth.currentUser);
  const navigate = useNavigate();
  //for edit data
  const [changedetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
    phone: auth.currentUser.phoneNumber,
  });
  const { name, email, phone } = formData;

  function onLogOut() {
    auth.signOut();
    navigate("/");
  }

  // for edit button
  const [edit, setEdit] = useState(false);
  const chang = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };
  function onEdit(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  async function onSubmit() {
    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.name,
      });

      //update firestore
      const docRef = doc(db,"users", auth.currentUser.uid);
      await updateDoc(docRef,{
        name,
      })
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile:", error);
    }
  }

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            <label className="flex justify-between items-baseline whitespace-nowrap py-3">
              Name :
              <input
                type="text"
                id="name"
                value={name}
                disabled={!edit}
                onChange={onEdit}
                className={`w-full mx-3 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                  edit && "bg-red-200 focus:bg-red-200"
                }`}
              />
            </label>

            <label className="flex justify-between whitespace-nowrap items-baseline py-3">
              phone number :
              <input
                type="text"
                id="phone"
                value={phone}
                disabled={!edit}
                onChange={onEdit}
                className={`w-full mx-3 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                  edit && "bg-red-200 focus:bg-red-200"
                }`}
              />
            </label>

            <label className="flex justify-between whitespace-nowrap items-baseline py-3">
              Email :
              <input
                type="text"
                id="email"
                value={email}
                disabled
                className="w-full mx-3 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
              />
            </label>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <button
                className="justify-end bg-fuchsia-400 hover:bg-fuchsia-700 transition ease-in-out duration-200 px-3 py-1 rounded"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  edit && onSubmit();
                  setEdit(!edit);
                }}
              >
                {edit ? "Save" : "Edit"}
              </button>
              <p
                onClick={onLogOut}
                className="text-red-600 hover:text-red-800 transition ease-in-out duration-200 cursor-pointer text-lg"
              >
                Sign out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
