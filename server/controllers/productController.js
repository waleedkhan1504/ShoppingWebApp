import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    return res.status(404).send("No product found");
  }
};
