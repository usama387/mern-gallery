import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyStripe = () => {
  // useContext hook to access shopContext data to use during api requests
  const { token, setCartItems, navigate, backendUrl } = useContext(ShopContext);

  // useSearchParams hook to get query parameters from the url
  const [searchParams, setSearchParams] = useSearchParams();

  // getting from search params to pass it to backend to verify payment
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const [loading, setLoading] = useState(false);

  // function with api to verify stripe payment
  const verifyStripePayment = async () => {
    setLoading(true);
    try {
      if (!token) {
        navigate("/login");
        return null;
      }

      const { data } = await axios.post(
        backendUrl + "/api/order/verifyStripe",
        { success, orderId },
        { headers: { token } }
      );

      if (data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyStripePayment();
  }, [token]);

  return (
    <div className="flex justify-center items-center mt-10">
      <h3 className="w-max px-2 py-4 bg-blue-200 text-gray-700 rounded-md text-base font-semibold">
        {loading ? "Verifying Payment" : "Payment Successful"}
      </h3>
    </div>
  );
};

export default VerifyStripe;
