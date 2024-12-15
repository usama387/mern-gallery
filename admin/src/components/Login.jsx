import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Login = ({ setToken }) => {
  // States for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // State for API loading
  const [apiLoading, setApiLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      setApiLoading(true);

      const { data } = await axios.post(backendUrl + "/api/user/adminLogin", {
        email,
        password,
      });
      if (data.success) {
        navigate("/orders");
        setToken(data.token);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid password");
    } finally {
      setApiLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gray-200">
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
              className="rounded-md w-full px-3 py-2 border-4 border-yellow-500 outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 min-w-72 relative">
            <p className="text-base font-medium text-gray-700 mb-2">Password</p>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              required
              className="rounded-md w-full px-3 py-2  border-4 border-yellow-500 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute top-10 right-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-28 py-3 bg-yellow-400 text-black text-base font-semibold transition-transform duration-300 hover:scale-105 flex justify-center items-center ml-20"
            disabled={apiLoading}
          >
            {apiLoading ? (
              <div className="w-5 h-5 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
