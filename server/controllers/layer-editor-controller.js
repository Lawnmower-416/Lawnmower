const databaseManager = require('./AWSManager/layereditor-controller')

function createLayer(req, res) {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request',
        })
    }
    let newLayer = databaseManager.createLayer(body, req.userId)
    if (newLayer) {
        return res.status(200).json({
            success: true,
            layer: newLayer,
        })
    }
    return res.status(400).json({
        success: false,
        error: 'Unable to create layer'
    })
}

function deleteLayer(req, res) {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        })
    }
    let layer = databaseManager.deleteLayer(req.params.layerId, req.userId)
    if (layer) {
        return res.status(200).json({
            success: true,
            layer: layer,
        })
    }
    return res.status(400).json({
        success: false,
        error: 'Unable to delete layer'
    })
}

function getLayer(req, res) {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        })
    }
    let layer = databaseManager.getLayer(req.params.layerId, req.userId)
    if (layer) {
        return res.status(200).json({
            success: true,
            layer: layer,
        })
    }
    return res.status(404).json({
        success: false,
        error: 'Layer not found'
    })
}

function updateLayer(req, res) {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        })
    }
    let layer = databaseManager.updateLayer(req.params.layerId, req.userId, body)
    if (layer) {
        return res.status(200).json({
            success: true,
            layer: layer,
        })
    }
    return res.status(404).json({
        success: false,
        error: 'Layer not found'
    })
}

module.exports = {
    createLayer,
    deleteLayer,
    getLayer,
    updateLayer
}