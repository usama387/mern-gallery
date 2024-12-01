import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <>
      {/* Title Section */}
      <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-start mb-6 mt-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Orders Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-8 min-h-screen rounded-lg shadow-lg">
        <div className="max-w-4xl mx-auto space-y-8">
          {products.slice(1, 4).map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              {/* Product Image */}
              <div className="w-24 h-24 flex-shrink-0">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              {/* Product Details */}
              <div className="flex-1 text-gray-800 dark:text-gray-200 space-y-2">
                <p className="text-lg font-semibold">{item.name}</p>
                <div className="flex flex-wrap gap-4 items-center text-sm">
                  <p>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Price:
                    </span>{" "}
                    <span className="text-indigo-600 dark:text-indigo-400">
                      {item.price} {currency}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Quantity:
                    </span>{" "}
                    <span>1</span>
                  </p>
                  <p>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Size:
                    </span>{" "}
                    <span>M</span>
                  </p>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Date:</span> 25, Dec, 2024
                </p>
              </div>
              {/* Status */}
              <div className="md:w-1/2 flex flex-col md:flex-row items-start md:items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ready to Ship
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                Track Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
