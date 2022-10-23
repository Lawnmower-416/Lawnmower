const databaseManager = require("AWSManager/tagseditor-controller");

function createTag(req, res) {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Improperly formatted request'
        });
    }
    let newTag = databaseManager.createTag(name, req.tagId);
    if (newTag) {
        return res.status(200).json({
            success: true,
            tag: newTag
        });
    } else {
        return res.status(400).json({
            success:false,
            errorMessage: "Unable to create tag"
        });
    }
}

function getTag(req, res) {
    const name = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Improperly formatted request'
        });
    } else {
        let tag = databaseManager.getTag(name, req.tagId);
        if (tag) {
            return res.status(200).json({
                success: true,
                tag: tag
            });
        } else {
            return res.status(400).json({
                success:false,
                errorMessage: "Unable to find tag"
            });
        }
    }
}

function updatetag(req, res) {
    const name = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Improperly formatted request'
        });
    } else {
        let tag = databaseManager.updateTag(name, req.tagId);
        if (tag) {
            return res.status(200).json({
                success: true,
                tag: tag
            });
        } else {
            return res.status(400).json({
                success: false,
                errorMessage: "Unable to update tag"
            });
        }
    }
}

function deletetag(req, res) {
    const name = req.body;
    if (!name) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Improperly formatted request'
        });
    } else {
        let tag = databaseManager.deletetag(body, req.tagId);
        if (tag) {
            return res.status(200).json({
                success: true,
                tag: tag
            });
        } else {
            return res.status(400).json({
                success:false,
                errorMessage: 'Unable to delete tag'
            });
        }
    }
}

module.exports = {
    createTag,
    getTag,
    updateTag,
    deleteTag
}
