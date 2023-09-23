const express = require("express")
const productRouter = express.Router()

const { verifyToken } = require('../middlewares/jwtAuth.middleware')
const { authorize } = require("../middlewares/roleAuthorize.middleware")

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct
} = require("../controllers/product.controller")

productRouter.get('/', getAllProducts)

productRouter.get('/:id', getProductById)

productRouter.post('/', verifyToken, authorize(["Admin"]), createProduct)

productRouter.patch('/:id', verifyToken, authorize(["Admin"]), updateProduct)

module.exports = { productRouter }
