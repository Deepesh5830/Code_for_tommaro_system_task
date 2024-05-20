const express = require("express");
const { userRegister, userLogin } = require("../controller/userController");
const authenticateUser = require("../middleware/auth");
const router = express.Router();

router.post("/userRegister",authenticateUser, userRegister)
router.post("/userLogin", userLogin)

module.exports = router;