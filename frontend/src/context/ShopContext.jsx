import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "PKR";
  const deliveryFee = 250;

  // this object contains data to be accessed anywhere
  const value = {
    products,
    currency,
    deliveryFee
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
