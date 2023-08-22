import Jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const isSignIn = (req, res, next) => {
  const decode = Jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
  req.user = decode;
  next();
};
export const isAdmin = async (req, res, next) => {
  try {
    const admin = await User.find({ role });
    if (admin.role !== true) {
      res.send({ message: "unauthorized access" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
