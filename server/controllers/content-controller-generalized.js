const databaseManager= require('../controllers/AWSManager/AWSmongoose-manager');
const { SendEmailTo } = require('./auth-controller');
// this controller is generalized to work with any db

function createMap(req, res) {
    const {owner, ownerUsername, title, height, width, tileSize} = req.body;
    const body = {owner, ownerUsername, title, height, width, tileSize};
    if (!owner || !ownerUsername || !title || !height || !width || !tileSize) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Improperly formatted request'
        });
    }
    let newMap;
    databaseManager.createMap(body, req.userId).then((map) => 
    {
        newMap = map;
        if (newMap) {
            return res.status(201).json({
                success: true,
                map: newMap
            });
        } else {
            return res.status(400).json({
                success: false,
                errorMessage: 'Unable to create map'
            });
        }
    }
    );
}

function deleteMap(req, res) {
    databaseManager.deleteMap(req.params.mapId, req.userId).then((deletedMap) => {
        if (deletedMap) {
            return res.status(200).json({
                success: true,
                map: deletedMap
            });
        } else {
            return res.status(400).json({
                success: false,
                errorMessage: 'Unable to delete map'
            });
        }
    }).catch(err => res.status(400).json({
        success: false,
        errorMessage: err
    }));
}

function getMapById(req, res) {
    databaseManager.getMapById(req.params.mapId, req.userId).then((map) => {
        if (map) {
            return res.status(200).json({
                success:true,
                map: map
            });
        }
        return res.status(404).json({
            success:false,
            errorMessage: 'Map not found'
        });
    });
}


// only get public maps for community page viewing
function getMaps(req, res) {
    databaseManager.getMaps().then((maps) => {;
        if (maps) {
            return res.status(200).json({
                success: true,
                maps: maps
            });
        }
        return res.status(404).json({
            success: false,
            errorMessage: 'Maps not found'
        });
    });
}

function updateMapGeneral(req, res) {
    const newMap = req.body;
    databaseManager.updateMapGeneral(newMap).then((updatedMap) => {
        if (updatedMap) {
            return res.status(200).json({
                success: true,
                map: updatedMap
            });
        } else {
            return res.status(400).json({
                success: false,
                errorMessage: 'Unable to update map'
            });
        }
    });
}

function forkMap(req, res) {
    const {map, owner, ownerUsername} = req.body;
    const body = {map, owner, ownerUsername};
    if (!map || !owner || !ownerUsername) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Improperly formatted request'
        });
    }
    let newMap;
    databaseManager.forkMap(body, req.userId).then((map) =>
    {
        newMap = map;
        if (newMap) {
            return res.status(201).json({
                success: true,
                map: newMap
            });
        } else {
            return res.status(400).json({
                success: false,
                errorMessage: 'Unable to fork map'
            });
        }
    }
    );
}

function createTileset(req, res) {
    const {owner, ownerUsername,  title, tileSize} = req.body;
    const body = {owner, ownerUsername, title, tileSize};
    if (!owner || !ownerUsername || !title || !tileSize) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Improperly formatted request'
        });
    }
    databaseManager.createTileset(body, req.userId).then((tileset) => {
        if (tileset) {
            return res.status(201).json({
                success: true,
                tileset: tileset
            });
        } else {
            return res.status(400).json({
                success: false,
                errorMessage: 'Unable to create tileset'
            });
        }
    });
}

function deleteTileset(req, res) {
    databaseManager.deleteTileset(req.params.tilesetId, req.userId).then((deletedTileset) => {
        if (deletedTileset) {
            return res.status(200).json({
                message: 'Tileset deleted',
                tileset: deletedTileset,
                success: true
            });
        } else {
            return res.status(400).json({
                success: false,
                errorMessage: 'Unable to delete tileset'
            });
        }
    }).catch(err => res.status(400).json({
        success: false,
        errorMessage: err
    }));
}

function getTilesetById(req, res) {
    databaseManager.getTilesetById(req.params.tilesetId, req.userId).then((tileset) => {
        if (tileset) {
            return res.status(200).json({
                success: true,
                tileset: tileset
            });
        }
        return res.status(404).json({
            errorMessage: 'Tileset not found',
            success: false
        });
    });
}

// only get public tilesets for community page viewing
function getTilesets(req, res) {
    databaseManager.getTilesets().then((tilesets) => {
        if (tilesets) {
            return res.status(200).json({
                success: false,
                tilesets: tilesets
            });
        }
        return res.status(404).json({
            success: false,
            errorMessage: 'Tilesets not found'
        });
    });
}

function updateTilesetGeneral(req, res) {
    const newTileset = req.body;
    databaseManager.updateTilesetGeneral(newTileset).then((updatedTileset) => {
        if (updatedTileset) {
            return res.status(200).json({
                success: true,
                tileset: updatedTileset
            });
        } else {
            return res.status(400).json({
                success: false,
                errorMessage: 'Unable to update tileset'
            });
        }
    });
}

<<<<<<< Updated upstream
function getReport(req, res) { // todo: check body
    const reportId = req.params.reportId;
    databaseManager.getReport(reportId).then(report => {
        return res.status(200).json({ success: true, report: report });
    }).catch(err => {
        return res.status(500).json({ success: true, report: report });
    });
}

function createReport(req, res) {
    if (!req.body)
    return res.status(400).json({ success: true, errorMessage: "Something went wrong..." });
    databaseManager.createReport(req.body).then(report => {
        const response = SendEmailTo(null, "lawnmower416@outlook.com", `Report Generated for ${report._id}`, null, JSON.stringify(report));
        if (response.isError) return res.status(400).json({ success: false, errorMessage: "Couldn't send email to admin..." });
        return res.status(200).json({ success: true, report: report });
    }).catch(err => {return res.status(500).json({ success: true, errorMessage: "Something went wrong..."}) });
}

function updateReport(req, res) {  // todo: check body
    const reportId = req.params.reportId;
    databaseManager.updateReport(reportId, body).then(report => {
        return res.status(200).json({ success: true, report: report });
    }).catch(err => {
        return res.status(500).json({ success: true, errorMessage: "Something went wrong..." });
    });
}

function deleteReport(req, res) { // todo: check body
    const reportId = req.params.reportId;
    databaseManager.deleteReport(reportId, body).then(report => {
        return res.status(200).json({ success: true, report: report });
    }).catch(err => {
        return res.status(500).json({ success: true, errorMessage: "Something went wrong..." });
=======
function forkTileset(req, res) {
    const {tileset, owner, ownerUsername} = req.body;
    const body = {tileset, owner, ownerUsername};
    if (!tileset || !owner || !ownerUsername) {
        return res.status(400).json({
            success: false,
            errorMessage: 'Improperly formatted request'
        });
    }
    databaseManager.forkTileset(body, req.userId).then((forkedTileset) => {
        if (forkedTileset) {
            return res.status(201).json({
                success: true,
                tileset: forkedTileset
            });
        } else {
            return res.status(400).json({
                success: false,
                errorMessage: 'Unable to fork tileset'
            });
        }
>>>>>>> Stashed changes
    });
}

module.exports = {
    createMap,
    deleteMap,
    getMapById,
    getMaps,
    updateMapGeneral,
    forkMap,
    createTileset,
    deleteTileset,
    getTilesetById,
    getTilesets,
    updateTilesetGeneral,
<<<<<<< Updated upstream
    getReport,
    createReport,
    updateReport,
    deleteReport
=======
    forkTileset
>>>>>>> Stashed changes
};