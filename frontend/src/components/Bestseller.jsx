import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const Bestseller = () => {
  // access products from context to filter bestseller and render them
  const { products } = useContext(ShopContext);

  //   holds product where bestSeller status is true in context api
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter((item) => item.bestseller === true);
    setBestSeller(bestProducts.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      {/* Texts */}
      <div className="text-center text-3xl py-8">
        <Title text1="BEST" text2="SELLER" />
        <p className="w-3/4 m-auto text-xs md:text-xl text-gray-600">
          Discover our best-selling products
        </p>
      </div>

      {/* Mapping and rendering best seller products by passing props in child components*/}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
