const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MapSchema = new Schema(
    {
        owner: { type: ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        creationDate: { type: String, required: true},
        tags: { type: [{type: ObjectId, ref: 'Tag'}], required: true},
        views: { type: Number, required: true},
        likedUsers: { type: [{type: ObjectId, ref: 'User'}], required: true},
        dislikedUsers: { type: [{type: ObjectId, ref: 'User'}], required: true},
        comments: { type: [{type: ObjectId, ref: 'Comment'}], required: true},
        deleted: { type: Boolean, required: true},
        collaborators: { type: [{ type: ObjectId, ref: 'User'}], required: true},
        viewers: { type: [{ type: ObjectId, ref: 'User'}], required: true},
        public: { type: Boolean, required: true},
        tilesets: { type: [{ type: ObjectId, ref: 'Tileset'}], required: true},
        height: { type: Number, required: true},
        width: { type: Number, required: true},
        tileSize: { type: Number, required: true},
        layers:{ type: [{type: ObjectId, ref: 'Layer'}], required: true},
    },
    { timestamps: true }
);
module.exports = mongoose.model('Map', MapSchema);