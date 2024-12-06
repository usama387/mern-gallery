import React, { useEffect, useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const AddProduct = ({ token }) => {
  // states to hold images and send to the server
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // state to hold product name and pass it to server
  const [name, setName] = useState("");

  // state to hold product category and pass it to server
  const [category, setCategory] = useState("Men");

  // state to hold product sub-category and pass it to server
  const [subCategory, setSubCategory] = useState("Topwear");

  // state to hold product description and pass it to server
  const [description, setDescription] = useState("");

  // state to hold product price and pass it to server
  const [price, setPrice] = useState("");

  // state to hold product bestseller status and pass it to server
  const [bestseller, setBestseller] = useState(false);

  // state to hold product sizes and pass it to server
  const [sizes, setSizes] = useState([]);

  // encapsulate all the state resets into one function ro reset form
  const resetForm = () => {
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setName("");
    setCategory("Men");
    setSubCategory("Topwear");
    setDescription("");
    setPrice("");
    setBestseller(false);
    setSizes([]);
  };

  // api loading state to handle dynamic submit button logic
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      setLoading(true);
      // create form data object to hold images and product data to send to the server
      const formData = new FormData();

      formData.append("name", name);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const { data } = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
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
      className="flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      <div className="">
        <p className="mb-2 w-max px-2 py-4 bg-blue-200 text-gray-800 text-base font-semibold rounded-md">
          Upload Images
        </p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
              alt=""
              className="w-20 cursor-pointer border border-blue-100"
            />
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>
          <label htmlFor="image2">
            <img
              src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
              alt=""
              className="w-20 cursor-pointer border border-blue-100"
            />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>
          <label htmlFor="image3">
            <img
              src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
              alt=""
              className="w-20 cursor-pointer border border-blue-100"
            />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>
          <label htmlFor="image4">
            <img
              src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
              alt=""
              className="w-20 cursor-pointer border border-blue-100"
            />
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      {/*Input Fields */}
      <div className="w-full">
        <p className="mb-2 text-teal-600 font-semibold">Product name</p>
        <input
          type="text"
          placeholder="type here"
          required
          className="w-full max-w-[500px] px-3 py-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      {/* Product description */}
      <div className="w-full ">
        <p className="mb-2 text-teal-600 font-semibold">Product description</p>
        <textarea
          type="text"
          placeholder="write about product"
          required
          className="w-full max-w-[500px] px-3 py-2"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <div className="flex flex-col sm:flex-row w-full gap-8">
        {/* Product category  */}
        <div className="">
          <p className="mb-2 text-teal-600 font-semibold">Product Category</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        {/* Product sub category  */}
        <div className="">
          <p className="mb-2 text-teal-600 font-semibold">Sub Category</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        {/* Product Price div */}
        <div className="">
          <p className="mb-2 text-teal-600 font-semibold">Product Price</p>
          <input
            type="number"
            placeholder="Enter price"
            className="w-full px-3 py-2 sm:w-[120px]"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>
      {/* Sizes div */}
      <div className="">
        <p className="mb-2 text-teal-600 font-semibold">Product Sizes</p>
        <div className="flex gap-3">
          {/* It checks in the state if a size is included in state if not then adds
          or remove it */}
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`bg-slate-300 px-3 py-1 cursor-pointer ${
                sizes.includes("S") ? "bg-yellow-500 text-black font-semibold rounded-md" : ""
              }`}
            >
              S
            </p>
          </div>

          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`bg-slate-300 px-3 py-1 cursor-pointer ${
                sizes.includes("M") ? "bg-yellow-500 text-black font-semibold rounded-md" : ""
              }`}
            >
              M
            </p>
          </div>

          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`bg-slate-300 px-3 py-1 cursor-pointer ${
                sizes.includes("L") ? "bg-yellow-500 text-black font-semibold rounded-md" : ""
              }`}
            >
              L
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`bg-slate-300 px-3 py-1 cursor-pointer ${
                sizes.includes("XL") ? "bg-yellow-500 text-black font-semibold rounded-md" : ""
              }`}
            >
              XL
            </p>
          </div>
          <div
            className=""
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`bg-slate-300 px-3 py-1 cursor-pointer ${
                sizes.includes("XXL") ? "bg-yellow-500 text-black font-semibold rounded-md" : ""
              }`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      {/* Bestsellers div */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>
      {/* Submit Button with Loading Effect */}
      <button
        type="submit"
        className="w-28 py-3 bg-yellow-400 text-black text-base font-semibold transition-transform duration-300 hover:scale-105 flex justify-center items-center"
        disabled={loading}
      >
        {loading ? (
          <div className="w-5 h-5 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Add Product"
        )}
      </button>
    </form>
  );
};

export default AddProduct;
