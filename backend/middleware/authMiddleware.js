import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { Error } from "mongoose";

const protect = AsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not Authorized, Token Failed!");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, No Token!");
  }
});
const admin = AsyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as Admin");
  }
});

export { protect, admin };
