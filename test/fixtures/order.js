const Order = require("../../src/models/orderModel");

const orders = [
  {
    _id: "649a9db1286116441a4cf582",
    customer: "649a9add811d67cd3dafbd34",
    products: "649a9af3811d67cd3dafbd36",
    totalPrice: 10000,
    status: "pending",
  },
  {
    _id: "649a9db1286116441a4cf572",
    customer: "649a9add811d67cd3dafbd24",
    products: "649a9af3811d67cd3dafbd26",
    totalPrice: 10000,
    status: "pending",
  },
];

async function insertOrder() {
  await Order.insertMany(orders);
}

async function deleteOrder() {
  await Order.deleteMany({});
}

module.exports = {
  orders,
  insertOrder,
  deleteOrder,
};
