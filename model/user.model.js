const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "User",
        enum: ["User", "Admin"]
    },
    addresses: {
        type: [mongoose.Schema.Types.Mixed]
    },
}, {
    versionKey: false,
    timestamps: true
})

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel
}