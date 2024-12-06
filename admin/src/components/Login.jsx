import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  // states email and password data to send it to api in body
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const { data } = await axios.post(backendUrl + "/api/user/adminLogin", {
        email,
        password,
      });
      if (data.success) {
        setToken(data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-base font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              required
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-base font-medium text-gray-700 mb-2">Password</p>
            <input
              type="password"
              placeholder="password"
              required
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="relative inline-flex items-center justify-center gap-2 py-3 px-6 text-lg font-semibold text-indigo-600 bg-transparent border-2 border-indigo-600 rounded-full transition-all duration-300 hover:bg-indigo-600 hover:text-white group ml-16"
          >
            <span className="relative z-10">Login</span>
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
      </div>
    </div>
  );
};

export default Login;
