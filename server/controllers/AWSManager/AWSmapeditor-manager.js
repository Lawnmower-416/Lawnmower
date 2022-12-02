const Map = require("../../models/map-schema");
const Tileset = require("../../models/tileset-schema");
const User = require("../../models/user-schema");

module.exports.updateMap = async (updatedMap) => {
    console.log(updatedMap);
    return await Map.findOneAndUpdate({ _id: updatedMap._id}, updatedMap, {returnOriginal: false});
}

module.exports.addCollaborator = async (mapId, newCollaborator) => {
    const updatedUser = await User.findOneAndUpdate({_id: newCollaborator._id}, 
        {$push: {maps: mapId}}).catch(err => false);
    if (!updatedUser) return null;
    return await Map.findOneAndUpdate(
        { _id: mapId},
        {$push: {collaborators: newCollaborator._id}},
        {returnOriginal: false});
}

module.exports.getCollaborators = async (mapId) => {
    const map = await Map.findOne({_id: mapId}).populate("collaborators");

    if(!map) {
        return null;
    }

    return map.collaborators;
}

module.exports.addCollaboratorForTileset = async (tilesetId, newCollaborator) => {
    const updatedUser = await User.findOneAndUpdate({_id: newCollaborator._id}, 
        {$push: {tilesets: tilesetId}}).catch(err => false);
    if (!updatedUser) return null;
    return await Tileset.findOneAndUpdate(
        { _id: tilesetId},
        {$push: {collaborators: newCollaborator._id}},
        {returnOriginal: false});
}

module.exports.getCollaboratorsForTileset = async (mapId) => {
    const tileset = await Tileset.findOne({_id: mapId}).populate("collaborators");

    if(!tileset) {
        return null;
    }

    return tileset.collaborators;
}