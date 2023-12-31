import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from "../components/OAuth";
import Login from "../components/Login";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";





export default function ForgotPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: ""
  });

  const { email } = formData;

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  async function handlesubmit (e) {
    e.preventDefault();
    // Code to handle login goes here
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth,email)
      toast.success("Email was sent")
    } catch (error) {
      toast.error("could not send reset password")
    }
  };

  const togglePop = () => {
    setSeen(!seen);
  };

  const [seen, setSeen] = useState(false);

  return (
    <div className="flex justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url("./pasta.jpg")` }}>
      <div className="w-full max-w-sm bg-white rounded-lg p-6 grid">
        <h2 className="text-2xl text-center mb-6">Login</h2>
        <form onSubmit={handlesubmit}>
          
          <label className="mb-4">
            Email:
            <input
              className="input-field w-full"
              type="email"
              id="email"
              value={email}
              onChange={handleInputChange}
            />
          </label>
          
          <div className="flex justify-between mb-4">
            <p>
              Already have an account?
              <button
                className="text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out ml-1"
                onClick={togglePop}
              >
                Login
              </button>
              {seen && <Login toggle={togglePop} />}
            </p>
            
          </div>
          <button
            className="w-full bg-blue-600 text-white font-medium uppercase hover:bg-blue-800 transition duration-150 ease-in-out shadow-lg py-2"
            type="submit"
          >
            Reset your password
          </button>
          <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-400 after:border-t after:flex-1 after:border-gray-400">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth />
        </form>
        <button onClick={togglePop}>Close</button>
      </div>
    </div>
  );
}
