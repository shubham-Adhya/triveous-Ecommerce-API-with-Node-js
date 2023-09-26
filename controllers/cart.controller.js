require("dotenv").config()

const { CartModel } = require("../model/cart.model")

//@description   add Product to Cart
//@route         POST /cart/
//@access        User 
const addToCart = async (req, res) => {
    const { _id } = req.user;
    const { quantity, product } = req.body;
    if (!quantity || !product) {
        return res.status(400).json({ message: "Missing required fields" })
    }
    try {
        const cart = new CartModel({ quantity, product, user: _id });
        const doc = await cart.save();
        const result = await doc.populate('product');
        return res.status(201).json({ message: "Product Added to Cart", cart: result });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//@description   get cart by userId (userId optional), Only admin can pass userId param
//@route         GET /cart/:userId
//@access        User and Admin
const getCartByUser = async (req, res) => {
    const { _id } = req.user;
    const { userId } = req.params;
    let searchUser = _id;
    if (req.user.role === "Admin") {
        searchUser =  userId || _id ;
    }

    try {
        const cartItems = await CartModel.find({ user: searchUser }).populate('product');
        return res.status(200).json(cartItems);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//@description   delete cart 
//@route         DELETE /cart/:id
//@access        User and Admin
const deleteCart = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await CartModel.findByIdAndDelete(id);
        return res.status(200).json({message: "Cart Deleted"});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

//@description   update cart
//@route         PATCH /cart/:id
//@access        User and Admin
const updateCart = async (req, res) => {
    const { id } = req.params;
    const { quantity, product } = req.body;
    // if (!quantity || !product) {
    //     return res.status(400).json({ message: "Missing required fields" })
    // }
    try {
        const cart = await CartModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        const result = await cart.populate('product');

        return res.status(200).json({message:"Cart Updated", cart: result});
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

module.exports = { addToCart, getCartByUser, deleteCart, updateCart }
