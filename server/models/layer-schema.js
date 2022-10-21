const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LayerSchema = new Schema(
    {
        name: { type: String, required: true },
        locked: { type: Boolean, required: true },
        visible: { type: Boolean, required: true },
        properties: [{ type: ObjectId, ref: 'Property' }],
        height: { type: Number },
        width: { type: Number },
        data: { type: [Number], required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Layer', LayerSchema);