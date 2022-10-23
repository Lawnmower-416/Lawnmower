const { findOneAndDelete, findOneAndUpdate } = require('../../models/tags-schema');
const Tags = require('../../models/tags-schema');

module.exports.createTag = async (req, res) => {
    const {name} = req.body;
    // Check to see if there is already an exisiting tag...
    const existingTag = await Tags.findOne( { name: name } ).catch(err => {
        return null;
    });
    if (!existingTag) { // Unique Tag...
        const newTag = new Tags({name: name});
        newTag
            .save()
            .then((tag) => {
                return tag;
            })
            .catch(err => {
                return null;
            });
    } else { // Existing Tag, just return that...
        return existingTag;
    }
}

module.exports.deleteTag = async (req, res) => {
    const tagId = req.params.tagId;
    await findOneAndDelete({ _id: tagId }, function (err, deletedTag) {
        if (err) return null;
        return deletedTag;
    });
}

module.exports.getTag = async (req, res) => {
    const tagId = req.params.tagId;
    await Tags.findOne({ _id: tagId }, function (err, tag) {
        if (err) null;
        return tag;
    });
}

module.exports.updateTag = async (req, res) => {
    const {name} = req.body;
    const tagId = req.params.tagId;
    await findOneAndUpdate({ _id: tagId }, { name: name }, {new: true}, (err, updatedTag) => {
        if (err) null;
        return updatedTag;
    });
}