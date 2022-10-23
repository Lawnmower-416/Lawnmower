const Map = require("../../models/map-schema.js");

module.exports.getMap = async (mapId) => {
    await Map.findById(mapId, (err, map) => {
        if(err) return null;
        return map;
    });
}

module.exports.updateMap = async (updatedMap) => {
    await Map.findOneAndUpdate({ _id: updatedMap._id}, updatedMap, {new: true}, (err, map) => {
        if(err) return null
        return updatedMap;
    });
}