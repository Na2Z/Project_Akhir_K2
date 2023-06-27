const Customer = require('../../src/models/customerModel');
const customers = [
  {
    _id: '6486ef6fdc1c04f730a2c1d0',
    name: 'Customer 1',
    email: 'cus1@mail.com',
    phone: '089864',
  },
  {
    _id: '6486ef78dc1c04f730a2c1d2',
    name: 'Customer 2',
    email: 'cus2@mail.com',
    phone: '089864',
  },
];
async function insertCustomer() {
  await Customer.insertMany(customers);
}
async function deleteCustomer() {
  await Customer.deleteMany({});
}

module.exports = {
  customers,
  insertCustomer,
  deleteCustomer,
};