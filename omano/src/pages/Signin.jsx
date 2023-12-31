import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

export default function Signin({ toggle }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [{user}, dispatch] = useStateValue();
  console.log(user);


useEffect(() => {

  console.log(user);
  if(user)
  {
    navigate("/")
  }

}, [user])

  const { email, password } = formData;
  // this function did not work it cant save state data and show it in dev
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  //function for handling form submitting
  async function handleLogin(e) {
    e.preventDefault();
    // Code to handle login goes here
    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth,email,password)
      if(userCredential.user)
      {
        console.log(userCredential.user);
        console.log("hola");
        navigate("/")
      }
    } catch (error) {
      toast.error("Bad user credential")
      console.log(error);
    }
    toggle();
  }

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2 className="text-2xl text-center mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email">Email:</label>
            <input
              className="input-field w-full"
              type="text"
              id="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={onChange}
              className="input-field pr-10 w-full"
            />
            {showPassword ? (
              <AiFillEyeInvisible
                className="absolute top-11 transform -translate-y-1/2 right-3 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            ) : (
              <AiFillEye
                className="absolute transform -translate-y-1/2 right-3 top-11 text-xl cursor-pointer"
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            )}
          </div>
          <div className="flex justify-between mb-4">
            <p>
              Don't have an account?{" "}
              <Link
                to="/sign-up"
                onClick={toggle}
                className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out ml-1"
              >
                Register
              </Link>
            </p>
            <p>
              <Link
                to="/forgot-password"
                onClick={toggle}
                className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out ml-1"
              >
                Forgot Password
              </Link>
            </p>
          </div>
          <button
            className="w-full bg-blue-600 text-white font-medium uppercase hover:bg-blue-800 transition duration-150 ease-in-out shadow-lg py-2"
            type="submit"
          >
            Login
          </button>
          <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-400 after:border-t after:flex-1 after:border-gray-400">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth />
        </form>
        <button onClick={toggle}>Close</button>
      </div>
    </div>
  );
}
