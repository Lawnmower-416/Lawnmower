const Map =require('../../models/map-schema');
const Tileset = require('../../models/tileset-schema');
const User = require('../../models/user-schema');

// content-controller-generalized.js is a generalization of database interactions
// content-controller-generalized.js handles json req, res and calls mongoose-manager.js
// this file, mongoose-manager.js, is a specialization of those interactions for mongoose
// mongoose-manager.js handles mongoose actions
// the functions should reflect this interaction

createMap = async (body, userId) => {
    let newMap = new Map(body);
    if (newMap) {
        newMap.owner = userId;
        User.findOne({ _id: userId }, (err, user) => {
            if (err) {
                return null;
            }
            newMap.save().then((map) => {
                user.maps.push(map._id);
                user.save().then(() => {return map;})
                    .catch(err => {return null;})
            }).catch(err => {return null;})
           
        });
    }       
}

deleteMap = async (mapId, userId) => {
    await Map.findById({ _id: mapId }, (err, map) => {
        if (err) {
            return null;
        }
        if (map.owner == userId) {
            return Map.findOneAndDelete({ _id: mapId })
        }
    });
    return null
}

getMapById = async (mapId, userId) => {
    let map = await Map.findOne({ _id: mapId});
    if (!map) {
        return null;
    }
    if (map.owner == userId) {
        return map;
    }
    return null;
}

// getMaps returns all maps
getMaps = async () => {
    let maps = [];
    for (let i = 0; i < user.maps.length; i++) {
        let map = await Map.findOne({ _id: user.maps[i] });
        if (map) {
            maps.push(map);
        }
    }
    return maps;
}

createTileset = async (body, userId) => {
    let newTileset = new Tileset(body);
    if (newTileset) {
        newTileset.owner = userId;
        User.findOne({ _id: userId }, (err, user) => {
            if (err) {
                return null;
            }
            newTileset.save().then((tileset) => {
                user.tilesets.push(tileset._id);
                user.save().then(() => {return tileset;})
                    .catch(err => {return null;})
            }).catch(err => {return null;})
        });
    }
}

deleteTileset = async (tilesetId, userId) => {
    await Tileset.findById({ _id: tilesetId }, (err, tileset) => {
        if (err) {
            return null;
        }
        if (tileset.owner == userId) {
            return Tileset.findOneAndDelete({ _id: tilesetId })
        }
    });
    return null
}

getTilesetById = async (tilesetId, userId) => {
    let tileset = await Tileset.findOne({ _id: tilesetId});
    if (!tileset) {
        return null;
    }
    if (tileset.owner == userId) {
        return tileset;
    }
    return null;
}

// getTilesets returns all tilesets
getTilesets = async () => {
    let tilesets = [];
    for (let i = 0; i < user.tilesets.length; i++) {
        let tileset = await Tileset.findOne({ _id: user.tilesets[i] });
        if (tileset) {
            tilesets.push(tileset);
        }
    }
    return tilesets;
}

module.exports = {
    createMap,
    deleteMap,
    getMapById,
    getMaps,
    createTileset,
    deleteTileset,
    getTilesetById,
    getTilesets
}