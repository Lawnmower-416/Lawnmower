const Layer = require("../../models/layer-schema");
const Map = require("../../models/map-schema");
const {save} = require("debug");

module.exports.createLayer = async (layerName, mapId) => {
    if (!layerName) return null;

    const fetchedMap = await Map.findById(mapId);
    if (!fetchedMap) return null;

    if(fetchedMap.layers.length >= 10) return null;

    const newLayer = new Layer({name: layerName});
    const savedLayer = await newLayer.save();

    const length = fetchedMap.width * fetchedMap.height;
    let data = new Array(length);
    for (let i = 0; i < length; i++) {
        data[i] = {tilesetIndex: -1, tileIndex: -1};
    }

    savedLayer.data = data;

    await savedLayer.save();

    fetchedMap.layers.push(savedLayer);
    await fetchedMap.save();
    return savedLayer;
};

module.exports.deleteLayer = async (layerId, mapId) => {
    if(!layerId) return null;

    const deletedLayer = await Layer.findOneAndDelete({_id: layerId}).catch(err => {return null;});
    if (!deletedLayer) return null;
    const fetchedMap = await Map.findOne({_id: mapId}).catch(err => {return null;});
    fetchedMap.layers.pull({_id: layerId});
    await fetchedMap.save();
    return deletedLayer;
};

module.exports.getLayer = async (layerId) => {
    if(!layerId) return null;

    const layer = await Layer.findById(layerId);
    if (!layer) return null;
    return layer;
};

module.exports.updateLayer = async (layerId, newLayer) => {
    const updatedLayer = await Layer.findOneAndUpdate({_id: layerId}, newLayer, {new: true});

    if (!updatedLayer) return null;
    return updatedLayer;
};

module.exports.placeTile = async (layerId, tile, index) => {
    const layer = await Layer.findById(layerId);
    if (!layer) return null;
    if(layer.data.length <= index) return null;
    layer.data[index] = tile;

    await layer.save();
    return layer;
}