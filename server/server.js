import express from "express";
import products from "./data/Products.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import orderRoutes from "./routes/orderRoute.js";
//config
dotenv.config();
connectDB();
//middlewares
const app = express();
app.use(express.json());
app.use(cors());
//routing
app.get("/hi", (req, res) => {
  res.send("hello world");
});
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", orderRoutes);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});
//error handlign middlewares
const PORT = process.env.PORT || 5000;
app.use(errorHandler);
app.listen(PORT, (req, res) => {
  console.log(`app is listening at ${PORT}`);
});
