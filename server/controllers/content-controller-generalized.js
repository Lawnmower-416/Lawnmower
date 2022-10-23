const databaseManager= require('../controllers/AWSManager/mongoose-manager');
// this controller is generalized to work with any db

function createMap(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    }
    let newMap = databaseManager.createMap(body, req.userId);
    if (newMap) {
        return res.status(200).json({
            successMessage: 'Map created',
            map: newMap
        });
    } else {
        return res.status(400).json({
            errorMessage: 'Unable to create map'
        });
    }
}

function deleteMap(req, res) {
    let map = databaseManager.deleteMap(req.params.mapId, req.userId);
    if (map) {
        return res.status(200).json({
            successMessage: 'Map deleted',
            map: map
        });
    } else {
        return res.status(400).json({
            errorMessage: 'Unable to delete map'
        });
    }
}

function getMapById(req, res) {
    let map = databaseManager.getMapById(req.params.mapId, req.userId);
    if (map) {
        return res.status(200).json({
            map: map
        });
    }
    return res.status(404).json({
        errorMessage: 'Map not found'
    });
}

function getMaps(req, res) {
    let maps = databaseManager.getMaps(req.userId);
    if (maps) {
        return res.status(200).json({
            maps: maps
        });
    }
    return res.status(404).json({
        errorMessage: 'Maps not found'
    });
}

function createTileset(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    }
    let newTileset = databaseManager.createTileset(body, req.userId);
    if (newTileset) {
        return res.status(200).json({
            successMessage: 'Tileset created',
            tileset: newTileset
        });
    } else {
        return res.status(400).json({
            errorMessage: 'Unable to create tileset'
        });
    }
}

function deleteTileset(req, res) {
    let tileset = databaseManager.deleteTileset(req.params.tilesetId, req.userId);
    if (tileset) {
        return res.status(200).json({
            successMessage: 'Tileset deleted',
            tileset: tileset
        });
    } else {
        return res.status(400).json({
            errorMessage: 'Unable to delete tileset'
        });
    }
}

function getTilesetById(req, res) {
    let tileset = databaseManager.getTilesetById(req.params.tilesetId, req.userId);
    if (tileset) {
        return res.status(200).json({
            tileset: tileset
        });
    }
    return res.status(404).json({
        errorMessage: 'Tileset not found'
    });
}

function getTilesets(req, res) {
    let tilesets = databaseManager.getTilesets(req.userId);
    if (tilesets) {
        return res.status(200).json({
            tilesets: tilesets
        });
    }
    return res.status(404).json({
        errorMessage: 'Tilesets not found'
    });
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
};