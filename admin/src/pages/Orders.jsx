import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import { useState, useEffect } from "react";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  // state to contain orders data from api
  const [orders, setOrders] = useState([]);

  const getOrdersForAdminPanel = async () => {
    try {
      if (!token) {
        return null;
      }

      const { data } = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      console.log(data);
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getOrdersForAdminPanel();
  }, [token]);

  return (
    <div>
      <h3 className="w-max px-2 py-4 bg-blue-200 text-gray-700 text-base font-semibold rounded-md">
        Placed Orders
      </h3>
      <div className="">
        {orders?.map((order, orderIndex) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
            key={orderIndex}
          >
            <img src={assets.parcel_icon} alt="Parcel Icon" className="w-12" />
            <div>
              <div className="">
                {order.items?.map((item, itemIndex) => {
                  if (itemIndex === order.items.length - 1) {
                    return (
                      <p key={itemIndex} className="py-0.5">
                        {item.name} x {item.quantity} <span>{item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={itemIndex} className="py-0.5">
                        {item.name} x {item.quantity} <span>{item.size}</span>,
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order?.address?.firstName + " " + order.address.lastName}
              </p>
              <div className="">
                <p>
                  {/* {order?.address?.street + ", "} */}
                  {order?.address?.city +
                    ", " +
                    order?.address?.state +
                    ", " +
                    order?.address?.zipCode}
                </p>
              </div>
              <p>{order?.address?.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Items: {order?.items?.length}
              </p>
              <p className="mt-3">Method: {order?.paymentMethod}</p>
              <p>Payment: {order?.payment ? "Paid" : "Pending"}</p>
              <p>Date: {new Date(order?.date).toDateString()}</p>
            </div>
            <p className="text-base font-semibold sm:text-[15px]">
              {order.amount} PKR
            </p>
            <select className="p-2 font-semibold w-max rounded-lg border border-gray-300 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out hover:cursor-pointer hover:bg-gray-50" value={order?.status}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
