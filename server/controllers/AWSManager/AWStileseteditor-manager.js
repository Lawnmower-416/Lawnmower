const Tileset = require("../../models/tileset-schema");
const Map = require("../../models/map-schema");
const {getData, uploadData} = require("./AWS-S3-manager");

module.exports.getTilesetsForMapById = async (mapId) => {
    const map = await Map.findOne({ _id: mapId }).catch(err => {return null;});
    //listOfTilesets is an array of tileset ids used by the map
    const tilesetList = [];
    for (let i = 0; i < map.tilesets.length; i++) {
        const tileset = await Tileset.findOne({ _id: map.tilesets[i] }).catch(err => {return null;});
        tilesetList.push(tileset);
    }

    for (let i = 0; i < tilesetList.length; i++) {
        const data = await getData(tilesetList[i].owner, tilesetList[i]._id, false);
        tilesetList[i].image = data;
        console.log(JSON.parse(data))
    }

    return tilesetList;
}

module.exports.updateTileset = (tilesetId , tilesetToUpdate) => {
    return Tileset.findOneAndUpdate({_id: tilesetId}, tilesetToUpdate, {new: true});
}

module.exports.getTilesetImage = async (tilesetId) => {
    const tileset = await Tileset.findOne({ _id: tilesetId }).catch(err => {return null;});

    const data = await getData(tileset.owner, tilesetId, false);
    console.log(data);
    return JSON.parse(data);
}

module.exports.updateTilesetImage = async (tilesetId, tilesetImage) => {
    const tileset = await Tileset.findOne({ _id: tilesetId }).catch(err => {return null;});
    if(tileset) {
        const data = await uploadData(tilesetImage, tileset.owner, tilesetId, false);
        return data;
    }
    return null;
}

module.exports.addCollaborator = async (tilesetId, newCollaborator) => {
    return await Tileset.findOneAndUpdate(
        { _id: tilesetId},
        {$push: {collaborators: newCollaborator._id}},
        {returnOriginal: false});
}

module.exports.getCollaborators = async (tilesetId) => {
    const tileset = await Tileset.findOne({_id: tilesetId}).populate("collaborators");

    if(!tileset) {
        return null;
    }

    return tileset.collaborators;
}