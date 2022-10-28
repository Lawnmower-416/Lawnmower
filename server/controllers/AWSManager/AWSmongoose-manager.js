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
        const user = await User.findOne({ _id: userId }).catch(err => {return null;});
        
        if (!user) {
            return null;
        }

        const updatedMap = await newMap.save().catch(err => {return null;});
        user.maps.push(updatedMap._id);
        await user.save().catch(err => {return null;});
        return updatedMap;
    }
}

deleteMap = async (mapId, userId) => {
    const map = await Map.findById({ _id: mapId }).catch(err => {return null;});
    if (!map) {
        return null;
    }
    if (map.owner == userId) {
        const deletedMap = await Map.findOneAndDelete({ _id: mapId });
        return (deletedMap === {} ? null : deletedMap);
    }
    return null;
}

getMapById = async (mapId, userId) => {
    let map = await Map.findOne({ _id: mapId}).catch(err => {return null;});
    if (!map) {
        return null;
    }
    if (map.owner == userId || map.collaborators.includes(userId)) {
        return map;
    }
    return null;
}

// getMaps returns all maps that are set to public for community page viewing
getMaps = async () => {
    return await Map.find({ public: true });
}

createTileset = async (body, userId) => {
    let newTileset = new Tileset(body);
    if (newTileset) {
        const user = await User.findOne({ _id: userId }).catch(err => {return null;});
        if (!user) {
            return null;
        }
        const updatedTileset = await newTileset.save().catch(err => { console.log(err); return null;});
        user.tilesets.push(updatedTileset._id);
        await user.save().catch(err => {return null;});
        return updatedTileset;
    }
}

deleteTileset = async (tilesetId, userId) => {
    const tileset = await Tileset.findById({ _id: tilesetId }).catch(err => {return null;});
    if (!tileset) {
        return null;
    }
    if (tileset.owner == userId) {
        const deletedTileset = await Tileset.findOneAndDelete({ _id: tilesetId });
        return (deletedTileset === {} ? null : deletedTileset);
    }
    return null;
}

getTilesetById = async (tilesetId, userId) => {
    let tileset = await Tileset.findOne({ _id: tilesetId}).catch(err => {return null;});
    if (!tileset) {
        return null;
    }
    if (tileset.owner == userId || tileset.collaborators.includes(userId)) {
        return tileset;
    }
    return null;
}

// getTilesets returns all tilesets that are set to public for community page viewing
getTilesets = async () => {
    return await Tileset.find({ public: true });
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