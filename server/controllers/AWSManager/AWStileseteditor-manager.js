const Tileset = require("../../models/tileset-schema");
const Map = require("../../models/map-schema");

module.exports.getTilesetsForMapById = async (mapId) => {
    const map = await Map.findOne({ _id: mapId }).catch(err => {return null;});
    //listOfTilesets is an array of tileset ids used by the map
    const tilesetList = [];
    for (let i = 0; i < map.tilesets.length; i++) {
        const tileset = await Tileset.findOne({ _id: map.tilesets[i] }).catch(err => {return null;});
        tilesetList.push(tileset);
    }
    return tilesetList;
}

module.exports.updateTileset = async (tilesetId , tilesetToUpdate) => {
    return await Tileset.findOneAndUpdate({ _id: tilesetId}, tilesetToUpdate, {new: true});
}