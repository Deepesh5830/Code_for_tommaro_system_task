const express = require("express");
const authenticateUser = require("../middleware/auth");
const { createService, createServicePrice, getServiceByCategoryId, deleteCategoriesByServiceId, updateCategoriesByServiceId } = require("../controller/serviceController");
const router = express.Router()

router.post("/createService", authenticateUser, createService)
router.post("/createServicePrice", authenticateUser, createServicePrice)
router.get("/category/:categoryId", authenticateUser, getServiceByCategoryId)
router.delete("/category/:categoryId/service/:serviceId", authenticateUser, deleteCategoriesByServiceId)
router.put("/category/:categoryId/service/:serviceId", authenticateUser, updateCategoriesByServiceId)

module.exports = router;