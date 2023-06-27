const Customer = require("../models/customerModel");

const fetchCustomer = async () => {
  try {
    const customers = await Customer.find({});
    return customers;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Internal Server Error" };
  }
};

const getCustomer = async (id) => {
  try {
    const customer = await Customer.findById(id);
    return customer;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Internal Server Error" };
  }
};

const createCustomer = async (customerData) => {
  try {
    const newCustomer = new Customer(customerData);
    const customer = await newCustomer.save(customerData);
    return customer;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Internal Server Error" };
  }
};

const editCustomer = async (id, customerData) => {
  try {
    const customer = await Customer.findByIdAndUpdate(id, customerData, {
      new: true,
    });
    if (!customer) {
      throw { status: 404, message: "Customer not found" };
    }
    return customer;
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Internal Server Error" };
  }
};

const binCustomer = async (id) => {
  try {
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      console.log("Customer not found");
      throw { status: 404, message: "Customer not found" };
    }
    return { message: "Customer has been Deleted" };
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Internal Server Error" };
  }
};

module.exports = {
  fetchCustomer,
  getCustomer,
  createCustomer,
  editCustomer,
  binCustomer,
};