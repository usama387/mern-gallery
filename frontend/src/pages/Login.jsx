import React, { useState } from "react";

const Login = () => {
  // state to toggle between login and sign up
  const [currentAuthState, setCurrentAuthState] = useState("Sign Up");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

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
        />
      )}
      <input
        type="email"
        className="w-full px-4 py-3 mb-4 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white  text-gray-800  placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-300"
        placeholder="Email"
      />
      <input
        type="password"
        className="w-full px-4 py-3 mb-6 border-2 border-gray-300 dark:border-gray-600 rounded-md bg-white  text-gray-800  dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 transition-all duration-300"
        placeholder="Password"
        required
      />
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
      >
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
        <span className="absolute top-0 left-0 block w-0 h-0 bg-indigo-600 rounded-full transition-all duration-300  group-hover:h-full group-hover:rounded-md"></span>
      </button>
    </form>
  );
};

export default Login;
