import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/Mongodb.js";
import connectToCloudinary from "./config/Cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// App Config
const app = express();
connectToCloudinary();

// db config
connectDb();

// middlewares
app.use(express.json());

// Allowed origins
const allowedOrigins = [
  "https://gallery-frontend-omega.vercel.app",
  "https://gallery-admin.vercel.app",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["set-cookie"],
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// user api end point
app.use("/api/user", userRouter);

// product api end point
app.use("/api/product", productRouter);

// user cart api end point
app.use("/api/cart", cartRouter);

// order api end point
app.use("/api/order", orderRouter);

// test api end point
app.get("/", (req, res) => {
  res.send("API is running...");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`The backend is up on port ${port}`);
});
