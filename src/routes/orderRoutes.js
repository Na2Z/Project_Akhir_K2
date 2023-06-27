const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const auth = require("../middleware/auth");

router.post("/", auth, orderController.addOrder);
router.get("/:id", auth, orderController.getOrderById);
router.put("/:id", auth, orderController.updateOrder);
router.delete("/:id", auth, orderController.deleteOrder);

module.exports = router;
