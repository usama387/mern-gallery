import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItems, currency, updateQuantity } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"CART"} text2={"ITEMS"} />
      </div>
      <div className="">
        {cartData.map((item, index) => {
          // using item id from cartData state variable finding product from products destructured from ShopContext api
          const product = products.find((product) => product._id === item._id);
          return (
            <div
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_2fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              key={index}
            >
              <div className="flex items-start gap-6">
                <img src={product.image[0]} alt="" className="w-16 sm:w-20" />
                <div className="">
                  <p className="text-base sm:text-lg font-medium text-teal-600">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-base font-medium bg-green-200 text-gray-700 rounded-md px-2 py-2 w-max">
                      {product.price} {currency}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border bg-blue-200 text-gray-600 font-semibold rounded-md">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border border-gray-300 rounded-md w-16 px-2 py-1 text-center text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-sm hover:shadow-md dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400"
                onChange={(e) => {
                  const value = e.target.value;

                  // Check if value is valid and greater than 0
                  if (value === "" || Number(value) <= 0) {
                    return; // Do nothing if value is empty or invalid
                  }

                  // Update the quantity with the new value
                  updateQuantity(item._id, item.size, Number(value));
                }}
              />

              <img
                src={assets.bin_icon}
                alt=""
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                onClick={() => updateQuantity(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>
      {/* Cart Total child component */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
        <CartTotal />
        </div>
      </div>
    </div>
  );
};

export default Cart;
