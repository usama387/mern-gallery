import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "PKR";
  const deliveryFee = 250;

  // state to hold token when user logs in or sign up
  const [token, setToken] = useState("");

  // ro manage search query state
  const [search, setSearch] = useState("");

  // to manage search bar appearance state
  const [showSearch, setShowSearch] = useState(false);

  // state to hold cart items details for all the downward functions
  const [cartItems, setCartItems] = useState({});

  // state to hold products data fetched from this api
  const [products, setProducts] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // for navigation
  const navigate = useNavigate();

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

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // calculates items in the cart using cartItems state variable
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  // function to update cart quantity
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // function to calculate cart items price using cartItems state variable
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      for (const size in cartItems[items]) {
        try {
          if (cartItems[items][size] > 0) {
            const product = products.find((product) => product._id === items);
            totalAmount += product.price * cartItems[items][size];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  // function to fetch all products from db
  const getProductsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/list`);
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
        setProducts([]);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      console.log("Making API call...");
      const { data } = await axios.post(
        `${backendUrl}/api/cart/getUserCart`,
        {}, 
        {
          headers: { token },
        }
      );
      console.log("API Response:", data);
      if (data.success) {
        console.log("Cart Data:", data.cartData);
        setCartItems(data.cartData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error in API call:", error);
      toast.error(error.message);
    }
  };

  // to invoke function on mount
  useEffect(() => {
    getProductsData();
  }, []);

  // to prevent logout on page refresh when useState resets
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      // to get cart details of users after login
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  // this object contains data to be accessed anywhere using context api
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
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
