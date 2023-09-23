const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    quantity: { type: Number, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
}, {
    timeStamps: true
});

const CartModel = mongoose.model('cart', cartSchema);
// mongoose.connection.syncIndexes()
module.exports = { CartModel }