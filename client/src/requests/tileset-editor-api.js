import {baseAPI} from "./index";

export const placeColor = (tilesetId, color, positions) => {
        return baseAPI.put(`/color/tileset/${tilesetId}/place`, positions)
    }

export const changeSettings = (tilesetId, title, length, width) => {
        return baseAPI.put(`/tileset/${tilesetId}/settings`, {title, length, width})
    }

export const exportVersion = (tilesetId, versionId) => {
        return baseAPI.get(`/tileset/${tilesetId}/version/${versionId}`)
    }

const apis = {
    placeColor,
    changeSettings,
    exportVersion
}