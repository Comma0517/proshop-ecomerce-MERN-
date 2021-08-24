import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//@desc Fetch all Products
//@route GET /api/products
//@access Public
const getProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});
//@desc Fetch Single Product
//@route GET /api/products/:id
//@access Public
const getProductById = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

export { getProducts, getProductById };
