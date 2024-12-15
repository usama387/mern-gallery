import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ListProducts from "./pages/ListProducts";
import Orders from "./pages/Orders";
import Login from "./components/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// will be accessed by other components/pages to make http requests to backend
export const backendUrl =
  import.meta.env.VITE_BACKEND_URL ||
  "https://gallery-backend-steel.vercel.app";

const App = () => {
  // state to hold admin token to prevent logout on page refresh
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        // if no token, render login component
        // setToken is passed as props to login where api returns token which is saved in setToken state here
        <Login setToken={setToken} />
      ) : (
        <>
          {/* if token exists, render navbar, sidebar, and routes and setToken is used to reset it to empty to logout*/}
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-gray-600 text-base">
              <Routes>
                {/* token is required in all following pages to send it to api */}
                <Route path="/add" element={<AddProduct token={token} />} />
                <Route path="/list" element={<ListProducts token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
