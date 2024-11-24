import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collections = () => {
  // useContext hook to access shopContext data to fetch data and perform search queries
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);

  // filtered products are stored in this state
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);

  const [subCategory, setSubCategory] = useState([]);

  const [sortType, setSortType] = useState("relevant");

  // checks if the category exists in category array otherwise adds it in else
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(category.filter((cat) => cat !== e.target.value));
    } else {
      setCategory([...category, e.target.value]);
    }
  };

  // checks if the sub-category exists in sub-category array otherwise adds it in else
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(subCategory.filter((sub) => sub !== e.target.value)); // Use subCategory here
    } else {
      setSubCategory([...subCategory, e.target.value]); // Use subCategory here
    }
  };

  // this function accesses category and sub category from useState to apply filters and also search and showSearch state keywords to search a product
  const applyFilter = () => {
    // this variable holds all the product to perform operations like filtering , sorting and searching
    let productsCopy = products.slice();

    if (search && showSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  // this function is called when a user selects a filter option from menu
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  // saves the filtered products in useState
  useEffect(() => {
    setFilterProducts(products);
  }, [products, showFilter]);

  const sortProduct = () => {
    let filteredProductsCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(
          filteredProductsCopy.sort((a, b) => a.price - b.price)
        );
        break;

      case "high-low":
        setFilterProducts(
          filteredProductsCopy.sort((a, b) => b.price - a.price)
        );
        break;
      default:
        applyFilter();
        break;
    }
  };

  // calls function inside useEffect when sort is applied from dropdown
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  useEffect(() => {
    console.log(category);
  }, [category]);

  useEffect(() => {
    console.log(subCategory);
  }, [subCategory]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Left Side Filter Options */}
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center gap-2 cursor-pointer"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-3 py-5 mt-6 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-xs font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids{" "}
            </p>
          </div>
        </div>
        {/* Sub-Category Filter */}
        <div
          className={`border border-gray-300 pl-3 py-5 mt-6 ${
            showFilter ? "block" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-xs font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            name=""
            id=""
            className="border-2 border-emerald-900 text-sm px-2 rounded-md"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant" className="text-teal-500 text-base">
              Sort By: Relevant
            </option>
            <option value="low-high" className="text-teal-500 text-base">
              Sort By: Low To High
            </option>
            <option value="high-low" className="text-teal-500 text-base">
              Sort By: High To Low
            </option>
          </select>
        </div>

        {/* Map to render Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
