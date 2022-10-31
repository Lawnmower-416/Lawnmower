const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentSchema = new Schema(
    {
        owner: { type: ObjectId, ref: 'User', required: true },
        contentType: { type: String, required: true },
        nestedCommentOwner: { type: ObjectId, ref: 'User' },
        nestedIndex: { type: Number, required: true },
        deleted: { type: Boolean }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);