/* Axios Library used to send HTTP requests to our back-end API
    The baseURL should be modified to fit the ec2 backe-end instead of 34.193.24.27 */

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

//TODO: Refactor below
export const addCollaborator = (id, collaboratorUsername, isTileset) => {
    if(isTileset) {
        return baseAPI.post(`/editor/tileset/${id}/collaborator`, {username: collaboratorUsername}, {withCredentials: true});
    }
    return baseAPI.post(`/editor/map/${id}/collaborator`, {username: collaboratorUsername}, {withCredentials: true});
}

export const getCollaborators = (id, isTileset) => {
    if(isTileset) {
        return baseAPI.get(`/editor/tileset/${id}/collaborators`, {withCredentials: true});
    }
    return baseAPI.get(`/editor/map/${id}/collaborators`, {withCredentials: true});
}

export const placeTiles = (mapId, layerId, tileId, positions) => {
    return baseAPI.put(`/editor/tile/map/${mapId}/layer/${layerId}/tile/${tileId}`, positions)
}

export const getLayer = (mapId, layerId) => {
    return baseAPI.get(`/editor/map/${mapId}/layer/${layerId}`, {withCredentials: true});
}

export const addLayer = (mapId, layerName) => {
    return baseAPI.post(`/editor/map/${mapId}/layer`, {name :layerName}, {withCredentials: true});
}

export const updateLayer = (mapId, layerId, layer) => {
    return baseAPI.put(`/editor/map/${mapId}/layer/${layerId}`, layer, {withCredentials: true});
}

export const placeTileOnLayer = (mapId, layerId, tile, index) => {
    return baseAPI.put(`/editor/map/${mapId}/layer/${layerId}/place`, {tile, index}, {withCredentials: true});
}

export const deleteLayer = (mapId, layerId) => {
    return baseAPI.delete(`/editor/map/${mapId}/layer/${layerId}`)
}

export const getProperty = (mapId, layerId, propertyId) => {
    return baseAPI.get(`/editor/map/${mapId}/layer/${layerId}/property/${propertyId}`, {withCredentials: true});
}

export const addProperty = (mapId, layerId, propertyName) => {
    return baseAPI.post(`/editor/map/${mapId}/layer/${layerId}/property`,{name: propertyName}, {withCredentials: true});
}

export const updateProperty = (mapId, layerId, propertyId, property) => {
    return baseAPI.put(`/editor/map/${mapId}/layer/${layerId}/property/${propertyId}`, property, {withCredentials: true});
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
    updateLayer,
    deleteLayer,
    addProperty,
    updateProperty,
    deleteProperty,
    changeSettings,
    importTileset,
    exportVersion
}

export default apis;