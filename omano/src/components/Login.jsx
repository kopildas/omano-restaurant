import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Signup from "./Signup";
import OAuth from "./OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { validateUserJWTTOken } from "../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

export default function Login({ toggle }) {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    
  });
  const [{user}, dispatch] = useStateValue();
  console.log(user);


useEffect(() => {

  console.log(user);

}, [user])



  const { email, password,  } = formData;
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
      
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        ).then((userCred)=> {
          auth.onAuthStateChanged((cred)=> {
            if(cred){
              cred.getIdToken().then(token => {
                console.log(token);
                validateUserJWTTOken(token).then(data => {
                  console.log(data);
                  dispatch({
                    type: actionType.SET_USER,
                    user: data,
                  });
                  localStorage.setItem("user", JSON.stringify(data));
                  navigate("/");
                })
              })
            }
          })
        });
        // if (userCredential.user) {
        //   console.log(userCredential.user);
        //   console.log("hola");
        //   navigate("/");
        // }
        toast.success("Login Successfully");
        // toggle();
      
    } catch (error) {
      toast.error("Bad user credential");
      console.log(error);
      toggle();
    }
  }

  return (
    <div className="popup backdrop-blur-sm">
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
              required
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
              required
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
        <div className="flex items-center justify-center mt-5 ">
        <button className="bg-red-500 w-12 h-12 text-white rounded-lg" onClick={toggle}>Close</button>

        </div>
      </div>
    </div>
  );
}
