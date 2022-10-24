// this is generalized to work with any db manager
// our implementation uses AWS

// databaseMananger requires propertyeditor-controller.js from AWSManager
const databaseManager = require('./AWSManager/propertyeditor-controller.js');

function createProperty(req, res) {
    const {name} = req.body;
    if (!name) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    }

    databaseManager.createProperty(name, req.params.layerId).then((newProperty) => {
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
    });
    
}

function getProperty(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    } else {
        databaseManager.getProperty(req.params.propertyId).then((property) => {
            if (property) {
                return res.status(200).json({
                    success: true,
                    property: property
                });
            } else {
                return res.status(400).json({
                    errorMessage: 'Unable to find property'
                });
            }
        });
    }
}

function updateProperty(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    } else {
        databaseManager.updateProperty(body, req.params.propertyId).then((property) => {
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
        });
    }
}

function deleteProperty(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    } else {
        databaseManager.deleteProperty(req.params.propertyId).then((property) => {
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
        });
    }
}

module.exports = {
    createProperty,
    getProperty,
    updateProperty,
    deleteProperty
}