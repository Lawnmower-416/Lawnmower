import { baseAPI as api } from ".";

export const createMap = (owner, ownerUsername, title, height, width, tileSize) => {
    return api.post(`/map/`, {
        owner: owner,
        ownerUsername: ownerUsername,
        title: title,
        height: height,
        width: width,
        tileSize: tileSize
    }, {
        withCredentials: true
    })
}
export const deleteMap = (mapId) => {
    return api.delete(`/map/${mapId}`, {withCredentials: true});
}
export const getMapById = (mapId) => {
    return api.get(`/map/${mapId}`, {withCredentials: true});
}
export const getMaps = () => {
    return api.get(`/maps`);
}
export const reportUser = (reporter, reportee, reason) => {
    return api.post(`/report`, {
        reporter: reporter,
        reportee: reportee,
        reason: reason,
    }, {
        withCredentials: true
    });
}


export const updateMapGeneral = (mapId, map) => {
    return api.put(`/map/${mapId}/general`, {
        map: map
    });
}

export const forkMap = (map, owner, ownerUsername) => {
    return api.post(`/map/fork`, {
        map: map,
        owner: owner,
        ownerUsername: ownerUsername
    }, {
        withCredentials: true
    });
}

export const createTileset = (owner, ownerUsername, title, tileSize) => {
    return api.post(`/tileset/`, {
        owner : owner,
        ownerUsername: ownerUsername,
        title : title,
        tileSize : tileSize
    }, {withCredentials: true});
}
export const deleteTileset = (tilesetId) => {
    return api.delete(`/tileset/${tilesetId}`, {withCredentials: true});
}
export const getTilesetById = (tilesetId) => {
    return api.get(`/tileset/${tilesetId}`, {withCredentials: true});
}
export const getTilesets = () => {
    return api.get(`/tilesets`);
}
export const updateTilesetGeneral = (tilesetId, tileset) => {
    return api.put(`/tileset/${tilesetId}/general`, {
        tileset: tileset
    });
}
export const forkTileset = (tileset, owner, ownerUsername) => {
    return api.post(`/tileset/fork`, {
        tileset: tileset,
        owner: owner,
        ownerUsername: ownerUsername
    }, {
        withCredentials: true
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
    updateTilesetGeneral,
    reportUser,
    forkMap,
    forkTileset
}

export default apis;