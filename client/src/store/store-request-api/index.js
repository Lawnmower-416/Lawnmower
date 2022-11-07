/* Axios Library used to send HTTP requests to our back-end API
    The baseURL should be modified to fit the ec2 backe-end instead of localhost */

import axios from 'axios';
axios.defaults.withCredentials = false;
const api = axios.create({
    baseURL: 'https://ec2-3-94-193-80.compute-1.amazonaws.com:3000'
});

export const createMap = (title, mapSize, TileLength) => {
    return api.post(`/map/`, {
        title : title,
        mapSize : mapSize,
        TileLength : TileLength
    })
}
export const deleteMap = (mapId) => {
    return api.delete(`/map/${mapId}`)
}
export const getMapById = (mapId) => {
    return api.get(`/map/${mapId}`)
}
export const getMaps = () => {
    return api.get(`/map/`)
}

export const updateMapGeneral = (mapId, map) => {
    return api.put(`/map/${mapId}/general`, {
        map: map
    })
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
    return api.get(`/tileset/`)
}
export const updateTilesetGeneral = (tilesetId, tileset) => {
    return api.put(`/tileset/${tilesetId}/general`, {
        tileset: tileset
    })
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