import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/Users.js";
import products from "./data/Products.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import connectDB from "./config/db.js";
import Order from "./models/OrderModel.js";
dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();
    const createUser = await User.insertMany(users);
    const adminUser = createUser[0]._id;
    const sampleData = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleData);
    console.log("Data imported!!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed!!!");
  } catch (error) {
    console.log(`${error}`);
    process.exit();
  }
};
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
