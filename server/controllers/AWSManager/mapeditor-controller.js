const Map = require("../../models/map-schema.js");

module.exports.getMap = async (req, res) => {
    const id = req.params.mapId;

    await Map.findById(id, (err, map) => {
        if(err) res.status(500).json({ success: false, errorMessage: err});
        return res.status(200).json({ success: true, map: map});
    });
}

module.exports.updateMap = async (req, res) => {
    const id = req.params.mapId;
    const updatedMap = req.body;

    await Map.findOneAndUpdate({ _id: id}, updatedMap, {new: true}, (err, map) => {
        if(err) return res.status(500).json({ success: false, errorMessage: err});
        return res.status(200).json({ success: true, tag: map});
    });
}