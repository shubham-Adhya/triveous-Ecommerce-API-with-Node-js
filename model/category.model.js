const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    label: { 
        type: String, 
        required: true, 
        unique: true 
    },
    description: { 
        type: String, 
        required: true, 
        unique: true 
    },
},{
    versionKey: false
});

const CategoryModel = mongoose.model('categories', categorySchema);
// mongoose.connection.syncIndexes()
module.exports={CategoryModel}