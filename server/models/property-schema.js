const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        value: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Property', PropertySchema);