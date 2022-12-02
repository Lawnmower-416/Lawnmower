const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ReportSchema = new Schema(
    {
        reporter: { type: ObjectId, ref: 'User', required: true },
        reportee: { type: ObjectId, ref: 'User', required: true },
        reason: { type: String, required: true },
        isReviewed: { type: Boolean, default: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Report', ReportSchema);