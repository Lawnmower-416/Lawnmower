const { findOneAndDelete, findOneAndUpdate } = require('../../models/tags-schema');
const Tags = require('../../models/tags-schema');

module.exports.createTag = async (req, res) => {
    const {name} = req.body;
    // Check to see if there is already an exisiting tag...
    const existingTag = await Tags.findOne( { name: name } ).catch(err => {
        return res.status(500).json({ success: false, errorMessage: err });
    });
    if (!existingTag) { // Unique Tag...
        const newTag = new Tags({name: name});
        newTag
            .save()
            .then((tag) => {
                return res.status(200).json({ success: true, tag: tag });
            })
            .catch(err => {
                return res.status(500).json({ success: false, errorMessage: err });
            });
    } else { // Existing Tag, just return that...
        return res.status(200).json({ success: true, tag: existingTag });
    }
}

module.exports.deleteTag = async (req, res) => {
    const tagId = req.params.tagId;
    await findOneAndDelete({ _id: tagId }, function (err, deletedTag) {
        if (err) return res.status(500).json({ success: false, errorMessage: err });
        return res.status(200).json({ success: true, tag: deletedTag });
    });
}

module.exports.getTag = async (req, res) => {
    const tagId = req.params.tagId;
    await Tags.findOne({ _id: tagId }, function (err, tag) {
        if (err) return res.status(500).json({ success: false, errorMessage: err });
        return res.status(200).json({ success: true, tag: tag });
    });
}

module.exports.updateTag = async (req, res) => {
    const {name} = req.body;
    const tagId = req.params.tagId;
    await findOneAndUpdate({ _id: tagId }, { name: name }, {new: true}, (err, updatedTag) => {
        if (err) return res.status(500).json({ success: false, errorMessage: err});
        return res.status(200).json({ success: true, tag: updatedTag });
    });
}