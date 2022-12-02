const Map = require("../../models/map-schema");

module.exports.updateMap = async (updatedMap) => {
    console.log(updatedMap);
    return await Map.findOneAndUpdate({ _id: updatedMap._id}, updatedMap, {returnOriginal: false});
}

module.exports.addCollaborator = async (mapId, newCollaborator) => {
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