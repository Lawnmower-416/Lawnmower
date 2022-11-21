/* Axios Library used to send HTTP requests to our back-end API
    The baseURL should be modified to fit the ec2 backe-end instead of 34.193.24.27 */

    import axios from 'axios';
    axios.defaults.withCredentials = false;
    const api = axios.create({
        baseURL: 'https://ec2-3-94-193-80.compute-1.amazonaws.com:3000'
    });

    export const getMap = (mapId) => {
        return api.get(`/map/${mapId}`)
    }

    export const placeTiles = (mapId, layerId, tileId, positions) => {
        return api.put(`/tile/map/${mapId}/layer/${layerId}/tile/${tileId}`, positions)
    }

    export const addLayer = (mapId, layerId) => {
        return api.post(`/layer/map/${mapId}/layer/${layerId}`)
    }
    
    export const deleteLayer = (mapId, layerId) => {
        return api.delete(`/map/${mapId}/layer/${layerId}`)
    }

    export const addProperty = (mapId, layerId, Property) => {
        return api.post(`/map/${mapId}/layer/${layerId}/property`, Property)
    }

    export const updateProperty = (mapId, layerId, propertyId, Property) => {
        return api.put(`/map/${mapId}/layer/${layerId}/property/${propertyId}`, Property)
    }

    export const deleteProperty = (mapId, layerId, propertyId) => {
        return api.delete(`/map/${mapId}/layer/${layerId}/property/${propertyId}`)
    }

    export const changeSettings = (mapId, title, length, width) => {
        return api.put(`/map/${mapId}/settings`, {title, length, width})
    }

    export const importTileset = (mapId, tileset) => {
        return api.put(`/tileset/map/${mapId}`, tileset)
    }

    export const exportVersion = (mapId, versionId) => {
        return api.get(`/map/${mapId}/version/${versionId}`)
    }

    const apis = {
        getMap,
        placeTiles,
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