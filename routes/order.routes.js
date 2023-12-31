const express = require("express")
const orderRouter = express.Router()

const { verifyToken } = require('../middlewares/jwtAuth.middleware')
const { authorize } = require("../middlewares/roleAuthorize.middleware")

const { 
    createOrder ,
    getOrdersByUserId,
    deleteOrder,
    updateOrder,
    getAllOrders
}=require("../controllers/order.controller")

orderRouter.post('/', verifyToken, authorize(["User"]), createOrder)  //done

orderRouter.get(['/own/', '/own/:userId'], verifyToken, authorize(["User", "Admin"]), getOrdersByUserId) //done

orderRouter.delete('/:id', verifyToken, authorize(["User", "Admin"]), deleteOrder)

orderRouter.patch('/:id', verifyToken, authorize(["User", "Admin"]), updateOrder)

orderRouter.get('/', verifyToken, authorize(["Admin"]), getAllOrders) //done


module.exports={orderRouter}