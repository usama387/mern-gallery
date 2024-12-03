import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/product.js";

// api to add a product by admin only
const addProduct = async (req, res) => {
  try {
    // accessing data from request body

    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    // accessing images from request files
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // to filter out undefined images
    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    // uploading images to cloudinary which returns back a secure_url
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productDataToBeUploaded = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    // creating a new product instance to pass data
    const product = new productModel(productDataToBeUploaded);

    // saving the product to the database
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error while adding product" });
  }
};

// api to list all products
const listProducts = async (req, res) => {
  try {
    // fetching all products from the database using mongoose find() method
    const listAllProducts = await productModel.find();

    // if no products found, returning a 404 status and message
    if (!listAllProducts) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      products: listAllProducts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error while listing products" });
  }
};

// api to remove a product only admin has access to it
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.status(200).json({
      success: true,
      message: "Product removed successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while removing product" });
  }
};

// api to get a single product information
const getProduct = async (req, res) => {
  try {
    const { productId } = await req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error while getting product" });
  }
};

export { addProduct, listProducts, removeProduct, getProduct };
