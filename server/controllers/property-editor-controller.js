// this is generalized to work with any db manager
// our implementation uses AWS

// databaseMananger requires propertyeditor-controller.js from AWSManager
const databaseManager = require('AWSManager/propertyeditor-controller.js');

function createProperty(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    }
    let newProperty = databaseManager.createProperty(body, req.user._id);
    if (newProperty) {
        return res.status(200).json({
            successMessage: 'Property created',
            property: newProperty
        });
    } else {
        return res.status(400).json({
            errorMessage: 'Unable to create property'
        });
    }
}

function getProperty(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    } else {
        let property = databaseManager.getProperty(body, req.user._id);
        if (property) {
            return res.status(200).json({
                successMessage: 'Property found',
                property: property
            });
        } else {
            return res.status(400).json({
                errorMessage: 'Unable to find property'
            });
        }
    }
}

function updateProperty(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    } else {
        let property = databaseManager.updateProperty(body, req.user._id);
        if (property) {
            return res.status(200).json({
                successMessage: 'Property updated',
                property: property
            });
        } else {
            return res.status(400).json({
                errorMessage: 'Unable to update property'
            });
        }
    }
}

function deleteProperty(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    } else {
        let property = databaseManager.deleteProperty(body, req.user._id);
        if (property) {
            return res.status(200).json({
                successMessage: 'Property deleted',
                property: property
            });
        } else {
            return res.status(400).json({
                errorMessage: 'Unable to delete property'
            });
        }
    }
}

module.exports = {
    createProperty,
    getProperty,
    updateProperty,
    deleteProperty
}