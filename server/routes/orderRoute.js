import express from "express";
import {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderController.js";
import { isSignIn } from "../middlewares/authMiddleware.js";
const router = express.Router();

//getUserOrder
router.get("/orders/myorders", isSignIn, getMyOrders);
//get order by id
router.get("/orders/:id", isSignIn, getOrderById);
//craete new order
router.post("/orders", isSignIn, addOrderItem);
//update order
router.put("/orders/:id/pay", isSignIn, updateOrderToPaid);
export default router;
