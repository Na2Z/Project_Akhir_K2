const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");


router.post('/login', authController.userLogin);
router.post('/register', authController.userRegister);

//router.delete("/users/:id", auth, authController.deleteAccount);
//router.get("/users/:id", auth, authController.getUser);

module.exports = router;
