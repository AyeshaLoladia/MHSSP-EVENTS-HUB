const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true }
});

module.exports = mongoose.model("admins", adminSchema);