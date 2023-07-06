import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import OAuth from "../components/OAuth";
import Login from "../components/Login";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";




export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const { username, email, password } = formData;

  const handleInputChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  async function handleSignup(e) {
    e.preventDefault();

    // for authentication using firebase auth
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(auth.currentUser, {
        displayName:username
      })
      const user = userCredential.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      //save into firebase storeage
      await setDoc(doc(db, "users", user.uid), formDataCopy)

      // redirect to home page
      navigate("/")
    } catch (error) {
      toast.error("Something went wrong with the registration!")
    }
  }
  const [seen, setSeen] = useState(false);
  const togglePop = () => {
    setSeen(!seen);
  };

  return (
    <div
      className="flex justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url("./pasta.jpg")` }}
    >
      <div className="w-full max-w-sm bg-white rounded-lg p-6 grid">
        <h2 className="text-2xl text-center mb-6">Login</h2>
        <form onSubmit={handleSignup}>
          <label className="mb-4">
            Username:
            <input
              className="input-field w-full"
              type="text"
              id="username"
              value={username}
              onChange={handleInputChange}
            />
          </label>
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
          <div className="relative mb-4">
            <label className="mb-2">
              Password:
              <input
                className="input-field pr-10 w-full"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleInputChange}
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
            </label>
          </div>
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
            <p>
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:text-blue-700 transit ion duration-200 ease-in-out ml-1"
              >
                Forgot Password
              </Link>
            </p>
          </div>
          <button
            className="w-full bg-blue-600 text-white font-medium uppercase hover:bg-blue-800 transition duration-150 ease-in-out shadow-lg py-2"
            type="submit"
          >
            Sign Up
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
