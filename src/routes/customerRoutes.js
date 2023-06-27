const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");
const auth = require('../middleware/auth');

router.post("/", auth, customerController.addCustomer);
router.patch("/:id", auth, customerController.updateCustomer);
router.delete("/:id", auth, customerController.deleteCustomer);
router.get("/:id", auth, customerController.getCustomerById);
router.get("/", customerController.getAllCustomers);

module.exports = router;
