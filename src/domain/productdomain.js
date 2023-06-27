const Product = require("../models/productModel");

const fetchProduct = async () => {
  try {
    const products = await Product.find({});
    return products;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Internal Server Error" };
  }
};

const getProduct = async (id) => {
  try {
    const product = await Product.find({_id: id});
    return product;
  } catch (error) {
    throw { status: 500, message: "Internal Server Error" };
  }
};

const createProduct = async (productData) => {
  try {
    const newProduct = new Product(productData);
    const product = await newProduct.save();
    return product;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Internal Server Error" };
  }
};

const editProduct = async (id, productData) => {
  try {
    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    return product;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Internal Server Error" };
  }
};

const binProduct = async (id) => {
  try {
    const product = await Product.findByIdAndDelete(id);
    return { message: "Product has been deleted" };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Internal Server Error" };
  }
};

module.exports = {
  fetchProduct,
  getProduct,
  createProduct,
  editProduct,
  binProduct,
};
