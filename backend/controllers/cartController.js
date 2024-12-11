import userModel from "../models/user.js";

const addProductToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    // get user information related to cartData using userId
    const userData = await userModel.findById(userId);

    // then store it in a variable
    let cartData = await userData.cartData;

    // in fist if it checks in cartData object is there any item then again in if this item has a size then increase its quantity by one otherwise in else initialize it and set it to 1
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // now update cartData object using the userId and cartData variable
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

const updateProductCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    // get user information related to cartData using userId
    const userData = await userModel.findById(userId);

    // then store it in a variable
    let cartData = await userData.cartData;

    // now update cartData
    cartData[itemId][size] = quantity;

    // now update cartData object using the userId and cartData variable
    await userModel.findByIdAndUpdate(userId, { cartData });

    res.status(200).json({ message: "Product quantity updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating product quantity" });
  }
};
const getUserCartDetail = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // get user information related to cartData using userId
    const userData = await userModel.findById(userId);

    // then store it in a variable
    let cartData = await userData.cartData;

    // now return cartData
    res.status(200).json({ cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error getting user cart detail" });
  }
};

export { addProductToCart, updateProductCart, getUserCartDetail };
