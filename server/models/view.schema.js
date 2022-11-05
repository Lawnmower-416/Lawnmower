const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const viewSchema = mongoose.Schema({   
    user: {
        type: ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('View', viewSchema)