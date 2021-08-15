import express from "express";
import { config } from "dotenv";
import cors from "cors";
import colors from "colors";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

config();
connectDB();

const app = express();

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
  )
);
