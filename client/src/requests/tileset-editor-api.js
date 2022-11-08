import axios from 'axios';
    axios.defaults.withCredentials = false;
    const api = axios.create({
        baseURL: 'https://ec2-3-94-193-80.compute-1.amazonaws.com:3000'
    });

export const getTileset = (tilesetId) => {
    return api.get(`/tileset/${tilesetId}`)
}

export const placeColor = (tilesetId, color, positions) => {
        return api.put(`/color/tileset/${tilesetId}/place`, positions)
    }

export const changeSettings = (tilesetId, title, length, width) => {
        return api.put(`/tileset/${tilesetId}/settings`, {title, length, width})
    }

export const exportVersion = (tilesetId, versionId) => {
        return api.get(`/tileset/${tilesetId}/version/${versionId}`)
    }

const apis = {
    getTileset,
    placeColor,
    changeSettings,
    exportVersion
}