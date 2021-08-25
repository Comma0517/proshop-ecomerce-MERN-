import express from "express";
import { config } from "dotenv";
import cors from "cors";
import colors from "colors";
import bodyParser from "body-parser";

import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

config();
connectDB();

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow.bold
  )
);
