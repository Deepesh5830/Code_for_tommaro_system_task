const express = require("express");
const { createCategory, getAllCategory, updateCategories, deleteCategories } = require("../controller/categoryController");
const authenticateUser = require("../middleware/auth");
const router = express.Router()

router.post("/createCategory", authenticateUser, createCategory)
router.get("/categories", authenticateUser, getAllCategory)
router.put("/:categoryId", authenticateUser, updateCategories)
router.delete("/:categoryId", authenticateUser, deleteCategories)

module.exports = router;