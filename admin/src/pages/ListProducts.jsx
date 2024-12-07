import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const ListProducts = ({ token }) => {
  // state to hold fetched products data
  const [productList, setProductList] = useState([]);

  // fetching api to get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/list`);
      if (data.success) {
        setProductList(data.products);
      } else {
        toast.error(data.message);
        setProductList([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // useEffect hook to fetch products on component mount
  useEffect(() => {
    getAllProducts();
  }, []);

  // api to remove products from database
  const removeProduct = async (id) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        // to refresh
        await getAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <p className="mb-2 bg-yellow-400 text-black font-semibold px-3 py-1 w-max rounded-md">
        Products List
      </p>
      <div className="flex flex-col gap-2">
        {/* List table title */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-blue-100 text-base">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* Product List */}

        {productList.length === 0 ? (
          <div className="flex items-center justify-center mt-10">
            <p className="text-center py-4 px-4 bg-yellow-400 text-black rounded w-max text-base font-semibold">
              No products available.
            </p>
          </div>
        ) : (
          productList.map((item, index) => (
            <div
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-base font-semibold"
              key={index}
            >
              <img src={item.image[0]} alt="" className="w-12 " />
              <p className="">{item.name}</p>
              <p className="">{item.category}</p>
              <p className="">
                {item.price} {"PKR"}
              </p>
              <p
                className="bg-red-500 text-white text-lg px-4 py-1 w-max cursor-pointer transition-transform duration-500 hover:scale-105"
                onClick={() => removeProduct(item._id)}
              >
                Remove
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ListProducts;
