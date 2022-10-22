const Map = require('../models/map-model');
const Tileset = require('../models/tileset-model');
const User = require('../models/user-model');

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
            user.maps.push(newMap._id);
            user
                .save()
                .then(() => {
                    newMap.save();
                    return newMap;
                })
                .catch((err) => {
                    return null;
                }
            );
        });
    }       
}

deleteMap = async (mapId, userId) => {
    Map.findById({ _id: mapId }, (err, map) => {
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
    let map = Map.findOne({ _id: mapId});
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
        let map = Map.findOne({ _id: user.maps[i] });
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
            user.tilesets.push(newTileset._id);
            user
                .save()
                .then(() => {
                    newTileset.save();
                    return newTileset;
                })
                .catch((err) => {
                    return null;
                }
            );
        });
    }
}

deleteTileset = async (tilesetId, userId) => {
    Tileset.findById({ _id: tilesetId }, (err, tileset) => {
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
    let tileset = Tileset.findOne({ _id: tilesetId});
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
        let tileset = Tileset.findOne({ _id: user.tilesets[i] });
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