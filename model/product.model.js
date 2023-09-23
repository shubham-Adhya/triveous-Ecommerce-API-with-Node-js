const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 1},
    rating: { type: Number, min: 0, max: 5, default: 1 },
    stock: { type: Number, min: 0, default: 0 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    deleted: { type: Boolean, default: false },
}, {
    versionKey: false
});

const ProductModel = mongoose.model('product', productSchema);
// mongoose.connection.syncIndexes()
module.exports = { ProductModel }