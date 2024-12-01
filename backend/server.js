import express from "express";
import cors from "cors";
import "dotenv/config";

// App Config
const app = express();

const port = process.env.PORT || 4000;

// middlewares
app.use(express.json());
app.use(cors());

// api end points
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => {
  console.log(`The backend is up on port ${port}`);
});
