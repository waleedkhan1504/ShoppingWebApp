import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log("connection is successfull ");
  } catch (error) {
    console.log({ message: "error in connecting database", error });
  }
};
export default connectDB;
/*mongodb+srv://waleed:waleed@cluster0.upk3cxm.mongodb.net/ShoppingApp?retryWrites=true&w=majority*/
