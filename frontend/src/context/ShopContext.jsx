import { createContext, useState } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

  // ro manage search query state
  const [search, setSearch] = useState("");

  // to manage search bar appearance state
  const [showSearch, setShowSearch] = useState(false);

  const currency = "PKR";
  const deliveryFee = 250;

  // this object contains data to be accessed anywhere
  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
