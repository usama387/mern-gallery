import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  // ro manage search query state
  const [search, setSearch] = useState("");

  // to manage search bar appearance state
  const [showSearch, setShowSearch] = useState(false);

  // state to hold cart items details
  const [cartItems, setCartItems] = useState({});

  // addToCart async function
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size first");
      return;
    }
    // Create a deep copy of the current cart items to avoid directly modifying the state
    let cartData = structuredClone(cartItems);

    // Check if the item already exists in the cart
    if (cartData[itemId]) {
      // If the item exists, check if the specific size is already in the cart
      if (cartData[itemId][size]) {
        // If the size exists, increment the quantity by 1
        cartData[itemId][size] += 1;
      } else {
        // If the size does not exist, initialize it with a quantity of 1
        cartData[itemId][size] = 1;
      }
    } else {
      // If the item does not exist in the cart, initialize it
      cartData[itemId] = {}; // Create a new object for the item
      cartData[itemId][size] = 1; // Set the initial quantity for the selected size
    }

    // Update the state with the modified cart data
    setCartItems(cartData);
  };

  // calculates items in the cart using cartItems state variable
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        try {
          if (cartItems[items][size] > 0) {
            totalCount += cartItems[items][size];
          }
        } catch (error) {}
      }
    }
    return totalCount; 
  };

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
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
