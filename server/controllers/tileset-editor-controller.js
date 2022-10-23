// router.post('/map/:mapId/layer/:layerId/property', auth.verify, PropertyEditorController.createProperty)
// router.get('/map/:mapId/layer/:layerId/property/:propertyId', auth.verify, PropertyEditorController.getProperty)
// router.put('/map/:mapId/layer/:layerId/property/:propertyId', auth.verify, PropertyEditorController.updateProperty)
// router.delete('/map/:mapId/layer/:layerId/property/:propertyId', auth.verify, PropertyEditorController.deleteProperty)

const databaseManager = require('./AWSManager/tileseteditor-controller')

function createTileset(req, res) {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'',
        })
    }
    let newTileset = databaseManager.createTileset(body, req.user._id)
    if (newTileset) {
        return res.status(200).json({
            success: true,
            tileset: newTileset,
        })
    }
    return res.status(400).json({
        success: false,
        error: 'Unable to create tileset'
    })
}

function getTilesetsForMapById(req, res) {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        })
    }
    let tilesets = databaseManager.getTilesetsForMapById(req.params.mapId, req.user._id)
    if (tilesets) {
        return res.status(200).json({
            success: true,
            tilesets: tilesets,
        })
    }
    return res.status(404).json({
        success: false,
        error: 'Tilesets not found'
    })
}

function getAllTilesets(req, res) {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        })
    }
    let tilesets = databaseManager.getAllTilesets(req.user._id)
    if (tilesets) {
        return res.status(200).json({
            success: true,
            tilesets: tilesets,
        })
    }
    return res.status(404).json({
        success: false,
        error: 'Tilesets not found'
    })
}

function getATileset(req, res) {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        })
    }
    let tileset = databaseManager.getATileset(req.params.tilesetId, req.user._id)
    if (tileset) {
        return res.status(200).json({
            success: true,
            tileset: tileset,
        })
    }
    return res.status(404).json({
        success: false,
        error: 'Tileset not found'
    })
}

function updateTileset(req, res) {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        })
    }
    let tileset = databaseManager.updateTileset(req.params.tilesetId, req.user._id)
    if (tileset) {
        return res.status(200).json({
            success: true,
            tileset: tileset,
        })
    }
    return res.status(400).json({
        success: false,
        error: 'Unable to update tileset'
    })
}

function deleteTileset(req, res) {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        })
    }
    let tileset = databaseManager.deleteTileset(req.params.tilesetId, req.user._id)
    if (tileset) {
        return res.status(200).json({
            success: true,
            tileset: tileset,
        })
    }
    return res.status(400).json({
        success: false,
        error: 'Unable to delete tileset'
    })
}

module.exports = {
    createTileset,
    getTilesetsForMapById,
    getAllTilesets,
    getATileset,
    updateTileset,
    deleteTileset,
}