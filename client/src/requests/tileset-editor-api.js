import {baseAPI} from "./index";

export const getTileset = (tilesetId) => {
    return baseAPI.get(`/editor/tileset/${tilesetId}`)
}

export const updateTileset = (tilesetId, tileset) => {
    return baseAPI.put(`/editor/tileset/${tilesetId}`, {tileset}, {withCredentials: true})
}

export const placeColor = (tilesetId, color, positions) => {
        return baseAPI.put(`/editor/color/tileset/${tilesetId}/place`, positions)
}

export const changeSettings = (tilesetId, title, length, width) => {
        return baseAPI.put(`/editor/tileset/${tilesetId}/settings`, {title, length, width})
}

export const exportVersion = (tilesetId, versionId) => {
        return baseAPI.get(`/editor/tileset/${tilesetId}/version/${versionId}`)
}

export const getTilesetImage = (tilesetId) => {
    return baseAPI.get(`/editor/tileset/${tilesetId}/image`, {withCredentials: true})
}

export const uploadTilesetImage = (tilesetId, stringImage) => {
    return baseAPI.put(`/editor/tileset/${tilesetId}/image`, {tilesetImage: stringImage}, {withCredentials: true})
}

const apis = {
    getTileset,
    updateTileset,
    placeColor,
    changeSettings,
    exportVersion,
    getTilesetImage,
    uploadTilesetImage
}

export default apis;