const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = mongoose.Schema({   
    name: {
        type: String,
        required: true,
    },
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)