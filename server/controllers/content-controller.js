const Map = require('../models/map-schema');
const Tileset = require('../models/tileset-schema');
const User = require('../models/user-schema');

createMap = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    }

    const map = new Map(body);
    if (!map) {
        return res.status(400).json({
            errorMessage: 'Unable to create map'
        });
    }

    User.findOne({ _id: req.user._id }, (err, user) => {
        user.maps.push(map);
        user
            .save()
            .then(() => {
                map
                .save()
                .then(() => {
                    return res.status(200).json({
                        successMessage: 'Map created',
                        map: map
                    });
                    })
                .catch(err => {
                    return res.status(400).json({
                        errorMessage: 'Unable to create map'
                    })
                    })
        })
    });
}

deleteMap = async (req, res) => {
    Map.findById({ _id : req.params.mapId }, (err, map) => {
        if (err) {
            return res.status(400).json({
                errorMessage: 'Unable to delete map'
            });
        }

        if (!map) {
            return res.status(404).json({
                errorMessage: 'Map not found'
            });
        }

        User.findOne({ _id: req.user._id }, (err, user) => {
            user.maps.pull(map);
            user
                .save()
                .then(() => {
                    map
                        .remove()
                        .then(() => {
                            return res.status(200).json({
                                successMessage: 'Map deleted'
                            });
                        })
                        .catch(err => {
                            return res.status(400).json({
                                errorMessage: 'Unable to delete map'
                            });
                        });
                })
                .catch(err => {
                    return res.status(400).json({
                        errorMessage: 'Unable to delete map'
                    });
                });
        });
    });
}

getMapById = async (req, res) => {
    Map.findById({ _id : req.params.mapId }, (err, map) => {
        if (err) {
            return res.status(400).json({
                errorMessage: 'Unable to retrieve map'
            });
        }

        if (!map) {
            return res.status(404).json({
                errorMessage: 'Map not found'
            });
        }

        if (map.public == false && req.user._id !== map.owner) {
            return res.status(401).json({
                errorMessage: 'Unauthorized'
            });
        }
        return res.status(200).json({
            payload: map
        });
    });
}

getMaps = async (req, res) => {
    Map.find({}, (err, maps) => {
        if (err) {
            return res.status(400).json({
                errorMessage: 'Unable to retrieve maps'
            });
        }
        return res.status(200).json({
            payload: maps
        });
    });
}


createTileset = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            errorMessage: 'Improperly formatted request'
        });
    }

    const tileset = new Tileset(body);
    if (!tileset) {
        return res.status(400).json({
            errorMessage: 'Unable to create tileset'
        });
    }

    User.findOne({ _id: req.user._id }, (err, user) => {
        user.tilesets.push(tileset);
        user
            .save()
            .then(() => {
                tileset
                .save()
                .then(() => {
                    return res.status(200).json({
                        successMessage: 'Tileset created',
                        tileset: tileset
                    });
                    })
                .catch(err => {
                    return res.status(400).json({
                        errorMessage: 'Unable to create tileset'
                    })
                    })
        })
    });
}

deleteTileset = async (req, res) => {
    Tileset.findById({ _id : req.params.tilesetId }, (err, tileset) => {
        if (err) {
            return res.status(400).json({
                errorMessage: 'Unable to delete tileset'
            });
        }

        if (!tileset) {
            return res.status(404).json({
                errorMessage: 'Tileset not found'
            });
        }

        User.findOne({ _id: req.user._id }, (err, user) => {
            user.tilesets.pull(tileset);
            user
                .save()
                .then(() => {
                    tileset
                        .remove()
                        .then(() => {
                            return res.status(200).json({
                                successMessage: 'Tileset deleted'
                            });
                        })
                        .catch(err => {
                            return res.status(400).json({
                                errorMessage: 'Unable to delete tileset'
                            });
                        });
                })
                .catch(err => {
                    return res.status(400).json({
                        errorMessage: 'Unable to delete tileset'
                    });
                });
        });
    });
}

getTilesetById = async (req, res) => {
    Tileset.findById({ _id : req.params.tilesetId }, (err, tileset) => {
        if (err) {
            return res.status(400).json({
                errorMessage: 'Unable to retrieve tileset'
            });
        }

        if (!tileset) {
            return res.status(404).json({
                errorMessage: 'Tileset not found'
            });
        }

        if (tileset.public == false && req.user._id !== tileset.owner) {
            return res.status(401).json({
                errorMessage: 'Unauthorized'
            });
        }
        return res.status(200).json({
            payload: tileset
        });
    });
}

getTilesets = async (req, res) => {
    Tileset.find({}, (err, tilesets) => {
        if (err) {
            return res.status(400).json({
                errorMessage: 'Unable to retrieve tilesets'
            });
        }

        return res.status(200).json({
            payload: tilesets
        });
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
}