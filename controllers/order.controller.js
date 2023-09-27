require("dotenv").config()

const { OrderModel } = require("../model/order.model")
const { UserModel } = require("../model/user.model")
const { ProductModel } = require("../model/product.model")

//@description   create new order 
//@route         POST /orders
//@access        User only  
const createOrder = async (req, res) => {
    try {
        const order = new OrderModel(req.body);

        // update stocks
        for (let item of order.items) {

            let product = await ProductModel.findOne({ _id: item.product.id })
            product.$inc('stock', -1 * item.quantity);
            await product.save()
        }

        const doc = await order.save();

        return res.status(201).json({ message: "New Order Created", order: doc });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//@description   get order by userId (userId optional), Only admin can pass userId param
//@route         GET /orders/own/:userId
//@access        User and Admin
const getOrdersByUserId = async (req, res) => {
    const { _id } = req.user;
    const { userId } = req.params;
    let searchUser = _id;
    if (req.user.role === "Admin") {
        searchUser = userId || _id;
    }
    try {
        const orders = await OrderModel.find({ user: searchUser });
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//@description   delete Order
//@route         DELETE /orders/:id
//@access        User and Admin
const deleteOrder = async (req, res) => {
    const { id } = req.params;
    
    if (req.user.role === "User") {
        let ord = await OrderModel.findById(id)
        if (!ord) {
            return res.status(401).json({ message: "Order doesn't exist" })
        }
        if (String(ord.user) !== String(req.user._id)) {
            return res.status(401).json({ message: 'Unauthorized, Only User who made the order can delete' });
        }
    }
    try {
        const order = await OrderModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "Order Deleted", order });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}
//@description   modify Order
//@route         PATCH /orders/:id
//@access        User and Admin
const updateOrder = async (req, res) => {
    const { id } = req.params;
    if(req.user.role==="User"){
        let ord = await OrderModel.findById(id)
        if(!ord){
            return res.status(401).json({message: "Order doesn't exist"})
        }
        if (String(ord?.user)!== String(req.user._id)){
            return res.status(401).json({ message: 'Unauthorized, Only User who made the order can modify' });
        }
    }
    try {
        const order = await OrderModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        return res.status(200).json({ message: "Order Updated", order });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//@description   get Orders (sort, pagination)
//@route         GET /orders/
//@access        Admin
const getAllOrders = async (req, res) => {
    // sort = {_sort:"price",_order="desc"}
    // pagination = {_page:1,_limit=10}

    try {
        let query = OrderModel.find({ deleted: { $ne: true } });
        let totalOrdersQuery = OrderModel.find({ deleted: { $ne: true } });


        if (req.query._sort === 'price' && req.query._order) {
            query = query.sort({ "totalAmount": req.query._order });
        }

        const totalDocs = await totalOrdersQuery.count().exec();
        // console.log({ totalDocs });

        if (req.query._page && req.query._limit) {
            const pageSize = req.query._limit;
            const page = req.query._page;
            query = query.skip(pageSize * (page - 1)).limit(pageSize);
        }


        const docs = await query.exec();
        res.set('X-Total-Count', totalDocs);
        return res.status(200).json({orders: docs});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = {
    createOrder,
    getOrdersByUserId,
    deleteOrder,
    updateOrder,
    getAllOrders
}