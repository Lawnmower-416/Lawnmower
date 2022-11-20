/* Axios Library used to send HTTP requests to our back-end API
    The baseURL should be modified to fit the ec2 backe-end instead of localhost */

import axios from 'axios';
import {baseAPI} from "./index";


export const getMap = (mapId) => {
    return baseAPI.get(`/editor/map/${mapId}`)
}

export const updateMap = (mapId, map) => {
    return baseAPI.put(`/editor/map/${mapId}`, map, {withCredentials: true});
}

export const getAllTilesets = (mapId) => {
    return baseAPI.get(`/editor/map/${mapId}/tilesets`, {withCredentials: true});
}

export const placeTiles = (mapId, layerId, tileId, positions) => {
    return baseAPI.put(`/editor/tile/map/${mapId}/layer/${layerId}/tile/${tileId}`, positions)
}

export const getLayer = (layerId) => {
    return baseAPI.get(`/editor/layer/${layerId}`)
}

export const addLayer = (mapId, layerId) => {
    return baseAPI.post(`/editor/layer/map/${mapId}/layer/${layerId}`)
}

export const deleteLayer = (mapId, layerId) => {
    return baseAPI.delete(`/editor/map/${mapId}/layer/${layerId}`)
}

export const getProperty = (propertyId) => {
    return baseAPI.get(`/editor/property/${propertyId}`);
}

export const addProperty = (mapId, layerId, Property) => {
    return baseAPI.post(`/editor/map/${mapId}/layer/${layerId}/property`, Property)
}

export const updateProperty = (mapId, layerId, propertyId, Property) => {
    return baseAPI.put(`/editor/map/${mapId}/layer/${layerId}/property/${propertyId}`, Property)
}

export const deleteProperty = (mapId, layerId, propertyId) => {
    return baseAPI.delete(`/editor/map/${mapId}/layer/${layerId}/property/${propertyId}`)
}

export const changeSettings = (mapId, title, length, width) => {
    return baseAPI.put(`/editor/map/${mapId}/settings`, {title, length, width})
}

export const importTileset = (mapId, tileset) => {
    return baseAPI.put(`/editor/tileset/map/${mapId}`, tileset)
}

export const exportVersion = (mapId, versionId) => {
    return baseAPI.get(`/editor/map/${mapId}/version/${versionId}`)
}

const apis = {
    getMap,
    getAllTilesets,
    placeTiles,
    getLayer,
    addLayer,
    deleteLayer,
    addProperty,
    updateProperty,
    deleteProperty,
    changeSettings,
    importTileset,
    exportVersion
}

export default apis;