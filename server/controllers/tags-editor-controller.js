const databaseManager = require("AWSManager/tagseditor-controller");

function createTag(req, res) {
    const name = req.body;
    if (!name) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    }
    let newTag = databaseManager.createTag(name, req.tagId);
    if (newTag) {
        return res.status(200).json({
            successMessage: 'Tag created',
            tag: newtag
        });
    } else {
        return res.status(400).json({
            errorMessage: 'Unable to create tag'
        });
    }
}

function getTag(req, res) {
    const name = req.body;
    if (!name) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    } else {
        let tag = databaseManager.getTag(name, req.tagId);
        if (tag) {
            return res.status(200).json({
                successMessage: 'Tag found',
                tag: tag
            });
        } else {
            return res.status(400).json({
                errorMessage: 'Unable to find tag'
            });
        }
    }
}

function updatetag(req, res) {
    const name = req.body;
    if (!name) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    } else {
        let tag = databaseManager.updateTag(name, req.tagId);
        if (tag) {
            return res.status(200).json({
                successMessage: 'tag updated',
                tag: tag
            });
        } else {
            return res.status(400).json({
                errorMessage: 'Unable to update tag'
            });
        }
    }
}

function deletetag(req, res) {
    const name = req.body;
    if (!name) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    } else {
        let tag = databaseManager.deletetag(body, req.tagId);
        if (tag) {
            return res.status(200).json({
                successMessage: 'tag deleted',
                tag: tag
            });
        } else {
            return res.status(400).json({
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