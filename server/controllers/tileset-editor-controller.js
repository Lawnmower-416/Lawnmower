const databaseManager = require('./AWSManager/AWStileseteditor-manager')
const mongooseManager = require("./AWSManager/AWSmongoose-manager");

function getTilesetsForMapById(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        })
    }
    databaseManager.getTilesetsForMapById(req.params.mapId).then((tilesets) => {
        if (tilesets) {
            return res.status(200).json({
                success: true,
                tilesets: tilesets,
            });
        }
        return res.status(404).json({
            success: false,
            error: 'Tilesets not found'
        });
    });
    
}

function updateTileset(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        });
    };
    databaseManager.updateTileset(req.params.tilesetId, req.body.tileset).then((tileset) => {
        if (tileset) {
            return res.status(200).json({
                success: true,
                tileset: tileset,
            });
        };
        return res.status(400).json({
            success: false,
            error: 'Unable to update tileset'
        });
    });
    
}

function getTilesetImage(req, res) {
    databaseManager.getTilesetImage(req.params.tilesetId).then((tilesetImage) => {
        if (tilesetImage) {
            return res.status(200).json({
                success: true,
                tilesetImage: tilesetImage,
            });
        }
        return res.status(404).json({
            success: false,
            error: 'Tileset image not found'
        });
    });
}

function uploadTilesetImage(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        });
    }

    databaseManager.updateTilesetImage(req.params.tilesetId, req.body.tilesetImage).then((tilesetImage) => {
        if (tilesetImage) {
            return res.status(200).json({
                success: true,
                tilesetImage: tilesetImage,
            });
        }
        return res.status(400).json({
            success: false,
            error: 'Unable to upload tileset image'
        });
    });
}

async function addCollaborator(req, res) {
    const id = req.params.tilesetId;
    const newCollaborator = req.body;

    if (!newCollaborator || !newCollaborator.username) {
        return res.status(400).json({
            success: false,
            errorMessage: "No collaborator provided"
        });
    }

    let tilesetToUpdate = await mongooseManager.getTilesetById(id, req.userId);
    let userToAdd = await mongooseManager.getUserByUsername(newCollaborator.username);

    if (!tilesetToUpdate) {
        return res.status(400).json({
            success: false,
            errorMessage: "Tileset not found"
        });
    }

    if (tilesetToUpdate.collaborators && tilesetToUpdate.collaborators.includes(userToAdd._id)) {
        return res.status(400).json({
            success: false,
            errorMessage: "User already a collaborator"
        });
    }

    if (tilesetToUpdate.collaborators && tilesetToUpdate.collaborators.length >= 10) {
        return res.status(400).json({
            success: false,
            errorMessage: "Tileset already has 10 collaborators"
        });
    }

    if (!userToAdd) {
        return res.status(400).json({
            success: false,
            errorMessage: "User not found"
        });
    }

    databaseManager.addCollaborator(id, userToAdd).then((tilesetToUpdate) => {
        if (!tilesetToUpdate) {
            return res.status(400).json({
                success: false,
                errorMessage: "Unable to update tileset"
            });
        } else {
            return res.status(200).json({
                success: true,
                tileset: tilesetToUpdate
            });
        }
    });
}

async function getCollaborators(req, res) {
    const id = req.params.tilesetId;

    let tileset = await mongooseManager.getTilesetById(id, req.userId);

    if (!tileset) {
        return res.status(400).json({
            success: false,
            errorMessage: "Tileset not found"
        });
    }

    databaseManager.getCollaborators(id).then((collaborators) => {
        if (!collaborators) {
            return res.status(400).json({
                success: false,
                errorMessage: "Unable to get collaborators"
            });
        } else {
            return res.status(200).json({
                success: true,
                collaborators: collaborators
            });
        }
    });
}


module.exports = {
    getTilesetsForMapById,
    updateTileset,
    getTilesetImage,
    uploadTilesetImage,
    addCollaborator,
    getCollaborators
}