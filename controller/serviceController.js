const db = require("../models")
const Service = db.Service;
const Service_Price = db.Service_Price;
const Category = db.Category;

const createService = async (req, res) => {
    try {
        const { categoryId, serviceName, type, price } = req.body;
        if (!categoryId || !serviceName || !type || !price) {
            return res.status(404).json({ success: false, message: "fields required." })
        }
        const info = { categoryId, serviceName, type, price }
        const service = await Service.create(info);
        res.status(201).json({ success: true, message: "service created successful.", service })

    } catch (error) {
        console.log("error--->", error)
    }
}

const createServicePrice = async (req, res) => {
    try {
        const { serviceId, duration, type, price } = req.body;
        if (!serviceId || !duration || !type || !price) {
            return res.status(404).json({ success: false, message: "fields required." })
        }
        const info = { serviceId, duration, type, price }
        const service = await Service_Price.create(info);
        res.status(201).json({ success: true, message: "service created successful.", service })

    } catch (error) {
        console.log("error--->", error)
    }
}

const getServiceByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const categories = await Service.findAll({ where: { categoryId: categoryId } })
        res.status(200).json({ success: true, message: 'Category fetch successful.', categories })
    } catch (error) {
        console.log("error--->", error)
    }
}

const deleteCategoriesByServiceId = async (req, res) => {
    try {
        const { serviceId, categoryId } = req.params;
        await Category.destroy({ where: { id: categoryId } })
        await Service.destroy({ where: { id: serviceId } })
        res.status(200).json({ success: true, message: "delete service with category." })
    } catch (error) {
        console.log("error--->", error)
    }
}
const updateCategoriesByServiceId = async (req, res) => {
    try {
        const { serviceId, categoryId } = req.params;
        const { categoryName, serviceName, type, price } = req.body;
        await Category.update({ categoryName: categoryName }, { where: { id: categoryId } })
        await Service.update({ categoryId: categoryId, serviceName: serviceName, type: type, price: price }, { where: { id: serviceId } })
        res.status(200).json({ success: true, message: "update service with category." })
    } catch (error) {
        console.log("error--->", error)
    }
}
module.exports = { createService, createServicePrice, getServiceByCategoryId, deleteCategoriesByServiceId, updateCategoriesByServiceId }