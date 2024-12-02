import userModel from "../models/user.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// takes userId as parameter to generate a token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// api for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // now check if the user is already registered
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // validate email and strong password format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const newSavedUser = await newUser.save();

    const token = createToken(newSavedUser._id);

    // sending token as a response
    res.status(200).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

// api for user login
const loginUser = async (req, res) => {
  try {
    // extract email and password from request body and check if its received properly
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // find user matches to this email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // compare the password to verify login authority
    const hasPasswordMatched = await bcrypt.compare(password, user.password);

    if (!hasPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // now send the token by attaching it with userId
    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to log in",
    });
  }
};

// api for admin login
const adminLogin = async (req, res) => {};

export { registerUser, loginUser, adminLogin };
