import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, getCartAmount, deliveryFee, navigate } = useContext(ShopContext);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      {/* Title Section */}
      <div className="text-2xl mb-4 text-center">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      {/* Cart Summary */}
      <div className="flex flex-col gap-4">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Subtotal</span>
          <span>
            {getCartAmount()}.00 {currency}
          </span>
        </div>
        <hr className="border-gray-300 dark:border-gray-600" />

        {/* Shipping Fee */}
        <div className="flex justify-between text-gray-600 dark:text-gray-300">
          <span>Shipping Fee</span>
          <span>
            {deliveryFee}.00 {currency}
          </span>
        </div>
        <hr className="border-gray-300 dark:border-gray-600" />

        {/* Total */}
        <div className="flex justify-between font-semibold text-lg text-gray-800 dark:text-white">
          <span>Total</span>
          <span>
            {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00 {currency}
          </span>
        </div>
      </div>

      {/* Checkout Button */}
      <button className="mt-6 w-full py-2 text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md shadow-md hover:from-purple-500 hover:to-indigo-500 transition duration-300 dark:from-green-400 dark:to-blue-500" onClick={()=>navigate("/place-order")}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartTotal;
