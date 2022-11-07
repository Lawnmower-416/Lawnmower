import { baseAPI as api } from ".";

export const createMap = (owner, title, height, width, tileSize) => {
    return api.post(`/map/`, {
        ownwer: owner,
        title: title,
        height: height,
        width: width,
        tileSize: tileSize
    })
}
export const deleteMap = (mapId) => {
    return api.delete(`/map/${mapId}`);
}
export const getMapById = (mapId) => {
    return api.get(`/map/${mapId}`);
}
export const getMaps = () => {
    return api.get(`/map/`);
}


export const updateMapGeneral = (mapId, map) => {
    return api.put(`/map/${mapId}/general`, {
        map: map
    });
}

export const createTileset = (owner, title, tileSize) => {
    return api.post(`/tileset/`, {
        owner : owner,
        title : title,
        tileSize : tileSize
    })
}
export const deleteTileset = (tilesetId) => {
    return api.delete(`/tileset/${tilesetId}`)
}
export const getTilesetById = (tilesetId) => {
    return api.get(`/tileset/${tilesetId}`)
}
export const getTilesets = () => {
    return api.get(`/tileset/`);
}
export const updateTilesetGeneral = (tilesetId, tileset) => {
    return api.put(`/tileset/${tilesetId}/general`, {
        tileset: tileset
    });
}

const apis = {
    createMap,
    deleteMap,
    getMapById,
    getMaps,
    updateMapGeneral,
    createTileset,
    deleteTileset,
    getTilesetById,
    getTilesets,
    updateTilesetGeneral
}

export default apis;