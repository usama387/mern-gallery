import React, { useContext, useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  // state to toggle between login and sign up
  const [currentAuthState, setCurrentAuthState] = useState("Log In");

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // sates to track input fields and send to backend
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  // destructuring required states and variables form context to sav token in storage and fetch api
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  // to manage api loading state
  const [apiLoading, setApiLoading] = useState(false);

  // dynamically calls sign up or login api based on state
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      setApiLoading(true);
      if (currentAuthState === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          // store the token in local storage
          localStorage.setItem("token", data.token);
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        console.log(data);
        if (data.success) {
          setToken(data.token);
          // store the token in local storage
          localStorage.setItem("token", data.token);
          toast.success(data.message);
        } else {
          toast.error(data.response.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    } finally {
      setApiLoading(false);
      if (currentAuthState === "Sign Up") {
        setName("");
        setEmail("");
        setPassword("");
      }
    }
  };

  // render home page when token is saved in browser after authentication
  useEffect(() => {
    if (token) {
      navigate("/"); // Redirect to home only when token exists
    } else {
      navigate("/login"); // Redirect to login when token is not present
    }
  }, [token, navigate]);

  return (
    <form
      className="flex flex-col items-center w-[90%] sm:max-w-[400px] m-auto mt-14 gap-6 text-gray-800  transition-colors duration-300"
      onSubmit={onSubmitHandler}
    >
      {/* Title Section */}
      <div className="inline-flex items-center gap-2 mb-6">
        <p className="text-4xl font-semibold text-blue-400 prata-regular">
          {currentAuthState}
        </p>
        <hr className="border-none h-[1.5px] w-12 bg-indigo-600 dark:bg-indigo-400 transition-all duration-300" />
      </div>

      {/* Input Fields */}
      {currentAuthState === "Sign Up" && (
        <input
          type="text"
          className="w-full px-4 py-3 mb-4 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white  text-gray-800  dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-300"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      )}

      <input
        type="email"
        className="w-full px-4 py-3 mb-4 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white  text-gray-800  placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-300"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      {/* Password logic */}
      <div className="relative w-full mb-6">
        <input
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white text-gray-800 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-300"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="w-full flex justify-between text-base mt-[-8px] font-semibold my-2">
        <p className="cursor-pointer text-blue-600">Forgot Password?</p>
        {currentAuthState === "Log In" ? (
          <p
            onClick={() => setCurrentAuthState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentAuthState("Log In")}
            className="cursor-pointer"
          >
            Login
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="relative inline-flex items-center justify-center gap-2 py-3 px-6 text-lg font-semibold text-indigo-600 bg-transparent border-2 border-indigo-600 rounded-full transition-all duration-300 hover:bg-indigo-600 hover:text-white group -mt-6"
        disabled={apiLoading}
      >
        {apiLoading ? (
          <div className="w-5 h-5 border-2 border-t-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <>
            <span className="relative z-10">
              {currentAuthState === "Sign Up" ? "Create Account" : "Login"}
            </span>
            <svg
              className="relative z-10 w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-0 transform -translate-x-1"
              viewBox="0 0 13 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1,5 L11,5"
                stroke="#234567"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <polyline
                points="8 1 12 5 8 9"
                stroke="#234567"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></polyline>
            </svg>
          </>
        )}
        <span className="absolute top-0 left-0 block w-0 h-0 bg-indigo-600 rounded-full transition-all duration-300 group-hover:h-full group-hover:rounded-md"></span>
      </button>
    </form>
  );
};

export default Login;
