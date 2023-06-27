const mongoose = require("mongoose");
const Order = require("../models/orderModel");
const Customer = require("../models/customerModel");
const Product = require("../models/productModel");
const { json } = require("express");

async function newOrder(orderData) {
  try {
    const [customer, products] = await Promise.all([
      Customer.findById(orderData.customer),
      Product.find({ _id: orderData.products }),
    ]);

    if (!customer || products.length === 0) {
      return res
        .status(404)
        .json({ error: "Pelanggan atau produk tidak ditemukan" });
    }
    const order = await Order.create(orderData);

    return orderData;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Terjadi kesalahan saat membuat pesanan" });
  }
}

async function getOrder(id) {
  try {
    const order = await Order.findById(id);
    return order;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
}

async function editOrder(id, orderData) {
  try {
    const order = await Order.findByIdAndUpdate(id, orderData, {
      new: true,
    });
    return order;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
}

async function binOrder(id) {
  try {
    const order = await Order.findByIdAndDelete(id);
    return { message: "Pesanan berhasil dihapus" };
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
}

module.exports = {
  newOrder,
  getOrder,
  editOrder,
  binOrder,
};
