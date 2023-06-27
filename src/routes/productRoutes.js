const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require("../middleware/auth");

router.get("/", auth, productController.getAllProducts);
router.get("/:Id", auth, productController.getProductById);
router.post("/", auth, productController.addProduct);
router.patch("/:Id", auth, productController.updateProduct);
router.delete("/:Id", auth, productController.deleteProduct);

module.exports = router;
