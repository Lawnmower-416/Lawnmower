const Layer = require("../../models/layer-schema.js");

module.exports.createLayer = async (layer, user_id) => {
    if (!layer) return null;

    const newLayer = new Layer(layer);
    newLayer.save().then(() => {
        return newLayer;
    }).catch(err => {return null});
}

module.exports.deleteLayer = async (layerId, user_id) => {
    if(!layerId) return null;

    await Layer.findOneAndDelete({_id: layerId}, (err, deletedLayer) => {
        if(err) return null;
        return deletedLayer;
    });
}

module.exports.getLayer = async (layerId) => {
    if(!layerId) return null;

    const layer = await Layer.findById(layerId);
    return layer;
}

module.exports.updateLayer = async (layerId, userId, newLayer) => {
    await Layer.findOneAndUpdate({_id: layerId}, newLayer, {new: true}, (err, updatedLayer) => {
        if (err) return null;
        return updatedLayer;
    })
}