const mongoose = require("mongoose");

const paymentMethods = {
    values: ['card', 'cash'],
    message: 'enum validator failed for payment Methods'
}

const orderSchema = mongoose.Schema({
    items: { type: [mongoose.Schema.Types.Mixed], required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String, required: true, enum: paymentMethods },
    paymentStatus: { type: String, default: 'pending' },
    status: { type: String, default: 'pending' },
    selectedAddress: { type: mongoose.Schema.Types.Mixed, required: true },
    deleted: { type: Boolean, default: false },
}, {
    timeStamps: true
});

const OrderModel = mongoose.model('order', orderSchema);
// mongoose.connection.syncIndexes()
module.exports = { OrderModel }