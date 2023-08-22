import express from "express";
const router = express.Router();

import {
  getAllProducts,
  getSingleProduct,
} from "../controllers/productController.js";
router.get("/allproducts", getAllProducts);
router.get("/product/:id", getSingleProduct);

export default router;
