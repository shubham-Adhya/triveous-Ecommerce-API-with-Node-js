require("dotenv").config()

const { CategoryModel } = require("../model/category.model")

//@description   get All Categories
//@route         GET /categories/
//@access        Public-All
const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.aggregate([
            { $match: { } },
            { $project: { _id: 0,__v:0} }
        ]);
        return res.status(200).json({ categories });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//@description   create new Category
//@route         POST /categories/
//@access        Admin only
const createCategory = async (req, res) => {
    const { label, description } = req.body;
    if (!label || !description) {
        return res.status(400).json({ message: "Provide Category Label & Description" })
    }
    try {
        const category = new CategoryModel(req.body);
        await category.save();
        res.status(201).json({ message: "New Category added successfully", category });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { getAllCategories, createCategory }