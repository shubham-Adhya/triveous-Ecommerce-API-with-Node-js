const express = require("express")
const categoryRouter = express.Router()

const { verifyToken } = require('../middlewares/jwtAuth.middleware')
const { authorize } = require("../middlewares/roleAuthorize.middleware")

const {
    getAllCategories,
    createCategory
} = require("../controllers/category.controller")

categoryRouter.get("/", getAllCategories)

categoryRouter.post("/",verifyToken,authorize(["Admin"]), createCategory)

module.exports = { categoryRouter }

