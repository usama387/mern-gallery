import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  // to access product id from url parameters
  const { productId } = useParams();

  const { products, currency } = useContext(ShopContext);

  // state to store product data sent from fetchProductData function
  const [productData, setProductData] = useState(false);

  // state to hold first image of all products
  const [image, setImage] = useState("");

  // state to hold selected size of product
  const [size, setSize] = useState("");

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        console.log(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-200 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {/* mapping on the list of all images and then render it in image tag */}
            {productData.image.map((item, index) => (
              <img
                src={item}
                alt=""
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                // to set image as main Image from mapped images
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            {/* accessing image from state variable */}
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        {/* Product Information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2 text-teal-500">
            {productData.name}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          {/* Price Logic */}
          <p className="mt-5 text-xl font-medium bg-green-200 text-gray-700 rounded-md px-2 py-2 w-max">
            {productData.price} {currency}
          </p>
          {/* Description Logic */}
          <p className="text-gray-500 bg-blue-100 px-4 py-2 rounded-md font-semibold mt-5 md:w-4/5">
            {productData.description}
          </p>
          {/* size selection logic */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 border bg-gray-100 rounded-md font-semibold ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-base mt-5 flex flex-col gap-1">
            <p className="">100% original products</p>
            <p className="">Cash on delivery available</p>
            <p className="">Return and Exchange is valid within 7 days</p>
          </div>
        </div>
      </div>

      {/* Product description and Review */}
      <div className="mt-20 bg-blue-100 text-gray-700 text-base rounded-md">
        <div className="flex gap-2">
          <b className="border px-5 py-3 text-base">Description</b>
          <p className="border px-5 py-3 text-base">Reviews(122)</p>
        </div>
        <div className="flex flex-col border px-5 py-6 text-sm">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
            eaque.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, error.
          </p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
