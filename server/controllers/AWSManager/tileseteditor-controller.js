const Tileset = require("../../models/tileset-schema.js");

module.exports.createTileset = async (req,res) => {
    db.TileSet.create({
        name: req.body.name,
        thumbnail_url: req.body.thumbnail_url
    }).then(function (data) {
        res.json(data)
    }).catch(function (error) {
        res.status(500).json(error)
    });
}

module.exports.getTilesetsForMapById = async (req, res) => {
    const id = req.params.tilesetId;
    await Tileset.findById(id, (err, tileset) => {
        if(err) res.status(500).json({ success: false, errorMessage: err});
        return res.status(200).json({ success: true, tileset: tileset});
    });
}

module.exports.getAllTilesets = async (req,res) => {
    db.TileSet.findAll({}).then((TileSets) => {
        res.json(TileSets)
    }).catch(error => {
        res.status(500).send(error.message)
    })
}


module.exports.getATileset = async (req,res) => {
    db.TileSet.findOne({
        where: {
            name: req.params.name
        }
    }).then(function (singleTileSet) {
        res.send(singleTileSet)
    }).catch(error => {
        res.status(500).send(error.message)
    })
}

module.exports.updateTileset = async (req, res) => {
    const id = req.params.tilesetId;
    const updatedTileset = req.body;
    await Tileset.findOneAndUpdate({ _id: id}, updatedTileset, {new: true}, (err, tileset) => {
        if(err) return res.status(500).json({ success: false, errorMessage: err});
        return res.status(200).json({ success: true, tag: tileset});
    });
}

module.exports.deleteTileset = async (req, res) => {
    db.TileSet.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (deleteTileSet) {
        res.json(deleteTileSet)
    }).catch(error => {
        res.status(500).send(error.message)
    })
}

