const databaseManager = require('./AWSManager/AWStileseteditor-manager')

function getTilesetsForMapById(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        })
    }
    databaseManager.getTilesetsForMapById(req.params.mapId).then((tilesets) => {
        if (tilesets) {
            return res.status(200).json({
                success: true,
                tilesets: tilesets,
            });
        }
        return res.status(404).json({
            success: false,
            error: 'Tilesets not found'
        });
    });
    
}

function updateTileset(req, res) {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Improperly formatted request'
        });
    };
    databaseManager.updateTileset(req.params.tilesetId, req.body.tileset).then((tileset) => {
        if (tileset) {
            return res.status(200).json({
                success: true,
                tileset: tileset,
            });
        };
        return res.status(400).json({
            success: false,
            error: 'Unable to update tileset'
        });
    });
    
};

module.exports = {
    getTilesetsForMapById,
    updateTileset
}