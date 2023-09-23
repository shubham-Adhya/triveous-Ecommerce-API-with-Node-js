const express = require("express")
const cartRouter = express.Router()

const { verifyToken } = require('../middlewares/jwtAuth.middleware')
const { authorize } = require("../middlewares/roleAuthorize.middleware")

const {
    addToCart,
    getCartByUser,
    deleteCart,
    updateCart
} = require("../controllers/cart.controller")

cartRouter.post('/', verifyToken, authorize(["User"]), addToCart)

cartRouter.get(['/','/:userId'], verifyToken, authorize(["User", "Admin"]), getCartByUser)

cartRouter.delete('/:id', verifyToken, authorize(["User", "Admin"]), deleteCart)

cartRouter.patch('/:id', verifyToken, authorize(["User", "Admin"]), updateCart)

module.exports = { cartRouter }
