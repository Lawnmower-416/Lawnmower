const databaseManager = require("./AWSManager/AWSmapeditor-manager");
const mongooseManager = require("./AWSManager/AWSmongoose-manager");

module.exports.updateMap = async (req, res) => {
    const id = req.params.mapId;
    const newMap = req.body;

    let mapToUpdate = await mongooseManager.getMapById(id, req.userId);
    //console.log(mapToUpdate); //prints null rn

    if(!mapToUpdate) {
        return res.status(400).json({
            success: false,
            errorMessage: "Map not found"
        });
    };

    databaseManager.updateMap(newMap).then((mapToUpdate) => {
        if(!mapToUpdate) {
            return res.status(400).json({
                success: false,
                errorMessage: "Unable to update map"
            });
        } else {
            return res.status(200).json({
                success: true,
                map: mapToUpdate
            });
        }
    });
}

module.exports.addCollaborator = async (req, res) => {
    const id = req.params.mapId;
    const newCollaborator = req.body;

    if(!newCollaborator || !newCollaborator.username) {
        return res.status(400).json({
            success: false,
            errorMessage: "No collaborator provided"
        });
    }

    let mapToUpdate = await mongooseManager.getMapById(id, req.userId);
    let userToAdd = await mongooseManager.getUserByUsername(newCollaborator.username);
    if(!mapToUpdate) {
        return res.status(400).json({
            success: false,
            errorMessage: "Map not found"
        });
    }

    if(!userToAdd) {
        return res.status(400).json({
            success: false,
            errorMessage: "User not found"
        });
    }

    if(mapToUpdate.collaborators && mapToUpdate.collaborators.includes(userToAdd._id)) {
        return res.status(400).json({
            success: false,
            errorMessage: "User already a collaborator"
        });
    }

    if(mapToUpdate.collaborators && mapToUpdate.collaborators.length >= 10) {
        return res.status(400).json({
            success: false,
            errorMessage: "Map already has 10 collaborators"
        });
    }

    databaseManager.addCollaborator(id, userToAdd).then((mapToUpdate) => {
        if(!mapToUpdate) {
            return res.status(400).json({
                success: false,
                errorMessage: "Unable to update map"
            });
        } else {
            return res.status(200).json({
                success: true,
                map: mapToUpdate
            });
        }
    });
}

module.exports.getCollaborators = async (req, res) => {
    const id = req.params.mapId;

    let mapToUpdate = await mongooseManager.getMapById(id, req.userId);

    if(!mapToUpdate) {
        return res.status(400).json({
            success: false,
            errorMessage: "Map not found"
        });
    }

    databaseManager.getCollaborators(id).then((collaborators) => {
        if(!collaborators) {
            return res.status(400).json({
                success: false,
                errorMessage: "Unable to update map"
            });
        } else {
            return res.status(200).json({
                success: true,
                collaborators: collaborators
            });
        }
    });
}

module.exports.addCollaboratorForTileset = async (req, res) => { // TODO
    const id = req.params.tilesetId;
    const newCollaborator = req.body;

    if(!newCollaborator || !newCollaborator.username) {
        return res.status(400).json({
            success: false,
            errorMessage: "No collaborator provided"
        });
    }

    let tilesetToUpdate = await mongooseManager.getTilesetById(id, req.userId);
    let userToAdd = await mongooseManager.getUserByUsername(newCollaborator.username);

    if(!tilesetToUpdate) {
        return res.status(400).json({
            success: false,
            errorMessage: "Map not found"
        });
    }

    if(!userToAdd) {
        return res.status(400).json({
            success: false,
            errorMessage: "User not found"
        });
    }

    if(tilesetToUpdate.collaborators && tilesetToUpdate.collaborators.includes(userToAdd._id)) {
        return res.status(400).json({
            success: false,
            errorMessage: "User already a collaborator"
        });
    }

    if(tilesetToUpdate.collaborators && tilesetToUpdate.collaborators.length >= 10) {
        return res.status(400).json({
            success: false,
            errorMessage: "Tileset already has 10 collaborators"
        });
    }

    databaseManager.addCollaboratorForTileset(id, userToAdd).then((tilesetToUpdate) => {
        if(!tilesetToUpdate) {
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

module.exports.getCollaboratorsForTileset = async (req, res) => { // TODO
    const id = req.params.tilesetId;

    let tilesetToUpdate = await mongooseManager.getTilesetById(id, req.userId);

    if(!tilesetToUpdate) {
        return res.status(400).json({
            success: false,
            errorMessage: "Tileset not found"
        });
    }

    databaseManager.getCollaboratorsForTileset(id).then((collaborators) => {
        if(!collaborators) {
            return res.status(400).json({
                success: false,
                errorMessage: "Unable to update tileset"
            });
        } else {
            return res.status(200).json({
                success: true,
                collaborators: collaborators
            });
        }
    });
}