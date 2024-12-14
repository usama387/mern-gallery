import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  // useContext hook to access shopContext data to use during api requests
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);

  // state to hold selected payment option
  const [method, setMethod] = useState("cod");

  // state to hold fromData to be send to server through api
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // function that tracks and pass data to fromData state from form
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // update formData object with the new value of name
    setFormData((data) => ({ ...data, [name]: value }));
  };

  // managing loading for api
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items])
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      switch (method) {
        // api call for cod order
        case "cod":
          const { data } = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }

          break;
        // api call for stripe payment gateway order
        case "stripe":
          const responseStripe = await axios.post(
            backendUrl + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[60vh] border-t"
      onSubmit={onSubmitHandler}
    >
      {/* Left Side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
        {/* Title Section */}
        <div className="text-xl sm:text-2xl my-3 text-center">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        {/* Name Inputs */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 py-2 px-4 w-full rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 py-2 px-4 w-full rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
          />
        </div>

        {/* Email Input */}
        <input
          type="text"
          placeholder="Email"
          className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 py-2 px-4 w-full rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
        />

        {/* Address Input */}
        <input
          type="text"
          placeholder="Address"
          className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 py-2 px-4 w-full rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          onChange={onChangeHandler}
          name="address"
          value={formData.address}
          required
        />

        {/* City and State Inputs */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 py-2 px-4 w-full rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 py-2 px-4 w-full rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
          />
        </div>

        {/* Phone and Postal Code Inputs */}
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Phone"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 py-2 px-4 w-full rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            required
          />
          <input
            type="number"
            placeholder="Postal Code"
            className="border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 py-2 px-4 w-full rounded-md text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onChange={onChangeHandler}
            name="zipCode"
            value={formData.zipCode}
            required
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-lg dark:bg-gray-800">
        {/* Cart Total Section */}
        <div className="min-w-80">
          <CartTotal />
        </div>

        {/* Payment Method Section */}
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-4 flex-col lg:flex-row mt-4">
            {/* Stripe Payment Option */}
            <div
              className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg p-3 cursor-pointer transition hover:shadow-md dark:hover:shadow-gray-900"
              onClick={() => setMethod("stripe")}
            >
              <p
                className={`min-w-[14px] h-[14px] border border-gray-500 dark:border-gray-400 rounded-full flex items-center justify-center ${
                  method === "stripe" ? "bg-blue-500" : ""
                }`}
              >
                <span className=" w-2.5 h-2.5 bg-indigo-500 rounded-full hidden"></span>{" "}
              </p>
              <img
                src={assets.stripe_logo}
                alt="Stripe Logo"
                className="h-6 mx-4"
              />
            </div>

            {/* Cash on Delivery Option */}
            <div
              className="flex items-center gap-3 border border-gray-300 dark:border-gray-700 rounded-lg p-3 cursor-pointer transition hover:shadow-md dark:hover:shadow-gray-900"
              onClick={() => setMethod("cod")}
            >
              <p
                className={`min-w-[14px] h-[14px] border border-gray-500 dark:border-gray-400 rounded-full flex items-center justify-center ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              >
                <span className=" w-2.5 h-2.5 bg-indigo-500 rounded-full hidden"></span>{" "}
                {/* Toggle visibility programmatically */}
              </p>
              <p className="text-gray-800 dark:text-gray-200">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg text-lg font-semibold shadow-lg hover:bg-indigo-700 transition dark:bg-indigo-500 dark:hover:bg-indigo-600"
              type="submit"
              disabled={loading}
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
