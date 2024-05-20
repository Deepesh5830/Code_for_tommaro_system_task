//import category model
const db = require("../models")
const Category = db.Category;
const Service = db.Service;

const createCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        if (!categoryName) {
            return res.status(404).json({ success: false, message: "categoryName is required." })
        }
        const category = await Category.create({ categoryName: categoryName })
        res.status(201).json({ success: true, message: 'categoryName created successful.', category })
    } catch (error) {
        console.log("error-->", error)
    }
}

const getAllCategory = async (req, res) => {
    try {
        const category = await Category.findAll()
        res.status(200).json({ success: true, message: "Category fetch successful.", category })
    } catch (error) {
        console.log("error--->", error)
    }
}

const updateCategories = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const { categoryName } = req.body;
        if (!categoryName) {
            return res.status(404).json({ success: false, message: "categoryName is required." })
        }
        await Category.update({ categoryName: categoryName }, { where: { id: categoryId } })
        res.status(201).json({ success: true, message: 'categoryName updated successful.' })
    } catch (error) {
        console.log("error--->", error)
    }
}
const deleteCategories = async (req, res) => {
    try {
        const { categoryId } = req.params;
       

        await Category.destroy({ where: { id: categoryId } })
        await Service.destroy({ where: { categoryId: categoryId } })
        res.status(201).json({ success: true, message: 'category deleted successful.' })
    } catch (error) {
        console.log("error--->", error)
    }
}

module.exports = { createCategory, getAllCategory, updateCategories, deleteCategories }