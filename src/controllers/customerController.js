const {
  fetchCustomer,
  getCustomer,
  createCustomer,
  editCustomer,
  binCustomer,
} = require("../domain/customerdomain");

const getAllCustomers = async (req, res) => {
  try {
    const customers = await fetchCustomer();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(error.status).send({ message: error.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await getCustomer(id);
    res.json(customer);
  } catch (error) {
    console.error(error);
    res.status(error.status).send({ message: error.message });
  }
};

const addCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    const newCustomer = await createCustomer(customerData);
    res.json(newCustomer);
  } catch (error) {
    res.status(error.status).send({ message: error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customerData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    await editCustomer(id, customerData, {
      new: true,
    });
    res.json(customerData);
  } catch (error) {
    console.error(error);
    res.status(error.status).send({ message: error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await binCustomer(id);
    res.json(customer);
  } catch (error) {
    res.status(error.status).send({ message: error.message });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};