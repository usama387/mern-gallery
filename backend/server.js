import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/Mongodb.js";
import connectToCloudinary from "./config/Cloudinary.js";

// App Config
const app = express();
connectToCloudinary()

// db config
connectDb();

// middlewares
app.use(express.json());
app.use(cors());

// api end points
app.get("/", (req, res) => {
  res.send("API is running...");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`The backend is up on port ${port}`);
});
