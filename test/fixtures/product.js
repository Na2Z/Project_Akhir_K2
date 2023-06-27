const Product = require('../../src/models/productModel');
const product = [
  {
    _id: '6486ef6fdc1c04f730a2c1d0',
    name: 'product 1',
    price: 1000,
    description: 'product 1',
  },
  {
    _id: '6486ef78dc1c04f730a2c1d2',
    name: 'product 2',
    price: 2000,
    description: 'product 2',
  },
];
async function insertProduct() {
  await Product.insertMany(product);
}
async function deleteProduct() {
  await Product.deleteMany({});
}

module.exports = {
  product,
  insertProduct,
  deleteProduct,
};