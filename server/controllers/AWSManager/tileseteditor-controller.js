const Tileset = require("../../models/tileset-schema");
const Map = require("../../models/map-schema");

module.exports.createTileset = async (body) => {
    await Tileset.create({
        name: body.name,
        thumbnail_url: body.thumbnail_url
    }).then(function (data) {
        return data;
    }).catch(function (error) {
        return null;
    });
    return null;
}

module.exports.getTilesetsForMapById = async (mapId) => {
    await Map.find({ _id: mapId }, (err, map) => {
        if(err) return null;
        return map.tilesets;
    });
    return null;
}

module.exports.getAllTilesets = async () => {
    await Tileset.findAll({}).then((Tilesets) => {
        return Tilesets;
    }).catch(error => {
        return null;
    });
    return null;
}

module.exports.getATileset = async (tilesetId) => { 
    await Tileset.findOne({
        _id: tilesetId
    }).then(function (singleTileset) {
        return singleTileset;
    }).catch(error => {
        return null;
    });
    return null;
}

module.exports.updateTileset = async (tilesetId , updatedTileset) => {
    await Tileset.findOneAndUpdate({ _id: tilesetId}, updatedTileset, {new: true}, (err, tileset) => {
        if(err) return null;
        return tileset;
    });
    return null;
}

module.exports.deleteTileset = async (tilesetId) => {
    await Tileset.findOneAndDelete({
        id: tilesetId
    }).then(function (deleteTileset) {
        return deleteTileset;
    }).catch(error => {
        return null;
    });
    return null;
}

