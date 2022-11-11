/* eslint-disable default-case */
import { createContext, useContext, useState } from "react";
import api from "./../requests/store-request";
import AuthContext from "../auth";


export const GlobalStoreContext = createContext();

export const GlobalStoreActionType = {
    LOAD_USER_MAPS: "LOAD_USER_MAPS",
    LOAD_USER_TILESETS: "LOAD_USER_TILESETS",
    LOAD_PUBLIC_MAPS: "LOAD_PUBLIC_MAPS",
    LOAD_PUBLIC_TILESETS: "LOAD_PUBLIC_TILESETS",
    LOAD_COMMENTS: "LOAD_COMMENTS",
    SORT_PUBLIC_MAPS: "SORT_PUBLIC_MAPS",
    SORT_PUBLIC_TILESETS: "SORT_PUBLIC_TILESETS",
    EDIT_VIEW_CONTENT: "EDIT_VIEW_CONTENT",
    EXPANDED_CONTENT: "EXPANDED_CONTENT",
}

function GlobalStoreContextProvider(props) {
    const [store, setStore] = useState({
        userMaps: [],
        userTilesets: [],
        userComments: [],
        publicMaps: [],
        publicTilesets: [],
        comments: [],
        shownPublicMaps: [],
        shownPublicTilesets: [],
        currentContentEditView: null,
        currentContentCommentsExpanded: null,
    });
    const { auth } = useContext(AuthContext);

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.LOAD_USER_MAPS: {
                return setStore({
                    userMaps: payload.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    shownPublicMaps: store.shownPublicMaps,
                    shownPublicTilesets: store.shownPublicTilesets,
                    currentContentEditView: store.currentContentEditView,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                })
            }
            case GlobalStoreActionType.LOAD_USER_TILESETS: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: payload.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    shownPublicMaps: store.shownPublicMaps,
                    shownPublicTilesets: store.shownPublicTilesets,
                    currentContentEditView: store.currentContentEditView,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                })
            }
            case GlobalStoreActionType.LOAD_PUBLIC_MAPS: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: payload.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    shownPublicMaps: payload.publicMaps,
                    shownPublicTilesets: store.shownPublicTilesets,
                    currentContentEditView: store.currentContentEditView,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                });
            }
            case GlobalStoreActionType.LOAD_PUBLIC_TILESETS: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: payload.publicTilesets,
                    comments: store.comments,
                    shownPublicMaps: store.shownPublicMaps,
                    shownPublicTilesets: payload.publicTilesets,
                    currentContentEditView: store.currentContentEditView,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                });
            }
            case GlobalStoreActionType.LOAD_COMMENTS: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: payload.comments,
                    shownPublicMaps: store.shownPublicMaps,
                    shownPublicTilesets: store.shownPublicTilesets,
                    currentContentEditView: store.currentContentEditView,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                });
            }
            case GlobalStoreActionType.SORT_PUBLIC_MAPS: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    shownPublicMaps: payload.shownPublicMaps,
                    shownPublicTilesets: store.shownPublicTilesets,
                    currentContentEditView: store.currentContentEditView,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                });
            }
            case GlobalStoreActionType.SORT_PUBLIC_TILESETS: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    shownPublicMaps: store.shownPublicMaps,
                    shownPublicTilesets: payload.shownPublicTilesets,
                    currentContentEditView: store.currentContentEditView,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                });
            }
            case GlobalStoreActionType.EDIT_VIEW_CONTENT: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    shownPublicMaps: store.shownPublicMaps,
                    shownPublicTilesets: store.shownPublicTilesets,
                    currentContentEditView: payload.currentContentEditView,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                });
            }
            case GlobalStoreActionType.EXPANDED_CONTENT: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    shownPublicMaps: store.shownPublicMaps,
                    shownPublicTilesets: store.shownPublicTilesets,
                    currentContentEditView: store.currentContentEditView,
                    currentContentCommentsExpanded: payload.currentContentCommentsExpanded,
                });
            }
        }
    }
    // load the user's maps in their profile
    store.loadUserMaps = async () => {
        try {
            console.log(auth.user)
            let userMapIds = auth.user.maps || [];
            let mapPromises = [];
            for (let i = 0; i < userMapIds.length; i++) {
                mapPromises.push(api.getMapById(userMapIds[i]));
            }

            if(mapPromises.length > 0) {
                Promise.all(mapPromises).then((responses) => {
                    let maps = [];
                    for (let i = 0; i < responses.length; i++) {
                        if(responses[i].status === 200) {
                            maps.push(responses[i].data.map);
                        }
                    }
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_USER_MAPS,
                        payload: {
                            userMaps: maps,
                        }
                    });
                });
            } else {
                storeReducer({
                    type: GlobalStoreActionType.LOAD_USER_MAPS,
                    payload: {
                        userMaps: []
                    }
                });
            }
        } catch (error) {
            console.log("Error loading user maps: ", error)
        }
    }
    // load the user's tilesets in their profile
    store.loadUserTilesets = async () => {
        try {
            let userTilesetIds = auth.user.tilesets
            let tilesetPromises = [];

            for (let i = 0; i < userTilesetIds.length; i++) {
                tilesetPromises.push(api.getTilesetById(userTilesetIds[i]));
            }

            Promise.all(tilesetPromises).then((responses) => {
                let tilesets = [];
                for (let i = 0; i < responses.length; i++) {
                    if(responses[i].status === 200) {
                        tilesets.push(responses[i].data.tileset);
                    }
                }
                storeReducer({
                    type: GlobalStoreActionType.LOAD_USER_TILESETS,
                    payload: {
                        userTilesets: tilesets
                    }
                })
            });
        } catch (error) {
            console.log("Error loading user tilesets: ", error)
        }
    }
    // load all public maps in community page
    store.loadPublicMaps = async () => {
        try {
            let allMaps = await api.getMaps()
            let publicMaps = []
            for (let i = 0; i < allMaps.length; i++) {
                if (allMaps[i].public) {
                    publicMaps.push(allMaps[i])
                }
            }
            // sort maps by most likes
            let shownMaps = publicMaps.sort((a, b) => {
                return b.likes.length - a.likes.length
            })
            storeReducer({
                type: GlobalStoreActionType.LOAD_PUBLIC_MAPS,
                payload: {
                    publicMaps: publicMaps,
                    shownPublicMaps: shownMaps
                }
            })
        } catch (error) {
            console.log("Error loading public maps: ", error)
        }
    }
    // load all public tilesets in community page
    store.loadPublicTilesets = async () => {
       try {
            let allTilesets = await api.getTilesets()
            let publicTilesets = []
            for (let i = 0; i < allTilesets.length; i++) {
                if (allTilesets[i].public) {
                    publicTilesets.push(allTilesets[i])
                }
            }
            // sort tilesets by most likes
            let shownTilesets = publicTilesets.sort((a, b) => {
                return b.likes - a.likes
            })
            storeReducer({
                type: GlobalStoreActionType.LOAD_PUBLIC_TILESETS,
                payload: {
                    publicTilesets: publicTilesets,
                    shownPublicTilesets: shownTilesets
                }
            })
        } catch (error) {
            console.log("Error loading public tilesets: ", error)
        }
    }
    // sort the public maps by a certain criteria
    store.sortPublicMaps = function (criteria) {
        let publicMaps = store.shownPublicMaps
        // sort by Likes, Creator, Date Created, Comments, Views, Tags (secondary sort by likes)
        switch (criteria) {
            case "Likes":
                publicMaps.sort((a, b) => {
                    return b.likes.length - a.likes.length
                })
                break
            case "Creator":
                publicMaps.sort((a, b) => {
                    return a.creator.username.localeCompare(b.creator.username)
                })
                break
            case "Date Created":
                publicMaps.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })
                break
            case "Comments":
                publicMaps.sort((a, b) => {
                    return b.comments.length - a.comments.length
                })
                break
            case "Views":
                publicMaps.sort((a, b) => {
                    return b.views - a.views
                })
                break
        }
        // if criteria is an array, then it is an array of tags
        if (Array.isArray(criteria)) {
            // in this case, sort by how many tags each map has that is in the criteria
            publicMaps.sort((a, b) => {
                let aTagCount = 0
                let bTagCount = 0
                for (let i = 0; i < a.tags.length; i++) {
                    if (criteria.includes(a.tags[i])) {
                        aTagCount++
                    }
                }
                for (let i = 0; i < b.tags.length; i++) {
                    if (criteria.includes(b.tags[i])) {
                        bTagCount++
                    }
                }
                return bTagCount - aTagCount
            })
        }
        storeReducer({
            type: GlobalStoreActionType.SORT_PUBLIC_MAPS,
            payload: {
                shownPublicMaps: publicMaps
            }
        })
    }
    // sort the public tilesets by a certain criteria
    store.sortPublicTilesets = function (criteria) {
        let publicTilesets = store.shownPublicTilesets
        // sort by Likes, Creator, Date Created, Comments, Views, Tags (secondary sort by likes)
        switch (criteria) {
            case "Likes":
                publicTilesets.sort((a, b) => {
                    return b.likes.length - a.likes.length
                })
                break
            case "Creator":
                publicTilesets.sort((a, b) => {
                    return a.creator.username.localeCompare(b.creator.username)
                })
                break
            case "Date Created":
                publicTilesets.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })
                break
            case "Comments":
                publicTilesets.sort((a, b) => {
                    return b.comments.length - a.comments.length
                })
                break
            case "Views":
                publicTilesets.sort((a, b) => {
                    return b.views - a.views
                })
                break
        }
        // if criteria is an array, then it is an array of tags
        if (Array.isArray(criteria)) {
            // in this case, sort by how many tags each tileset has that is in the criteria
            publicTilesets.sort((a, b) => {
                let aTagCount = 0
                let bTagCount = 0
                for (let i = 0; i < a.tags.length; i++) {
                    if (criteria.includes(a.tags[i])) {
                        aTagCount++
                    }
                }
                for (let i = 0; i < b.tags.length; i++) {
                    if (criteria.includes(b.tags[i])) {
                        bTagCount++
                    } 
                }
                return bTagCount - aTagCount
            })
        }
        storeReducer({
            type: GlobalStoreActionType.SORT_PUBLIC_TILESETS,
            payload: {
                shownPublicTilesets: publicTilesets
            }
        })
    }

    // delete a map
    store.deleteMap = async function (mapId) {
        try {
            let response = await api.deleteMap(mapId)
            // a user can only delete their maps in their profile page
            // refresh only the user's maps
            // community maps will be refreshed the next time the community page is opened
            if (response.data.success) {
                store.loadUserMaps()
            }
        } catch (error) {
            console.log("Error deleting map: ", error)
        }
    }
    // delete a tileset
    store.deleteTileset = async function (tilesetId) {
        try {
            let response = await api.deleteTileset(tilesetId)
            // a user can only delete their tilesets in their profile page
            // refresh only the user's tilesets
            // community maps will be refreshed the next time the community page is opened
            if (response.data.success) {
                store.loadUserTilesets()
            }
        } catch (error) {
            console.log("Error deleting tileset: ", error)
        }
    }
    // increment or decrement the number of likes by removing user_id from likes array
    store.updateMapLikes = async (mapId) => {
        try {
            const response = await api.getMapById(mapId)
            if (response.data.success) {
                const map = response.data.map
                if (map.likes.includes(auth.user._id)) {
                    console.log("Removing like to map")
                    map.likes.splice(map.likes.indexOf(auth.user._id), 1)
                } else {
                    console.log("adding like to map")
                    map.likes.push(auth.user._id)
                }
                const responseGeneral = await api.updateMapGeneral(mapId, map)
                if (responseGeneral.data.success) {
                    store.loadUserMaps()
                    store.loadPublicMaps()
                }
            }
        } catch (error) {
            console.log("Error updating map likes: ", error)
        }
        
    }
    // increment or decrement the number of dislikes by removing user_id from likes array
    store.updateMapDislikes = async (mapId) => {
        try {
            const response = await api.getMapById(mapId);
            if (response.data.success) {
                let map = response.data.map;
                if (map.dislikes.includes(auth.user._id)) {
                    console.log("Removing dislike to map")
                    map.dislikes.splice(map.dislikes.indexOf(auth.user._id), 1)
                } else {
                    console.log("adding dislike to map")
                    map.dislikes.push(auth.user._id)
                }
                const responseGeneral = await api.updateMapGeneral(mapId, map)
                if (responseGeneral.data.success) {
                    store.loadUserMaps()
                    store.loadPublicMaps()
                }
            }
        } catch (error) {
            console.log("Error updating map dislikes: ", error);
        }
    }
    // increment or decrement the number of likes by removing user_id from likes array
    store.updateTilesetLikes = async (tilesetId) => {
        try {
            const response = await api.getTilesetById(tilesetId)
            if (response.data.success) {
                const tileset = response.data.tileset
                if (tileset.likes.includes(auth.user._id)) {
                    console.log("Removing like to tileset")
                    tileset.likes.splice(tileset.likes.indexOf(auth.user._id), 1)
                } else {
                    console.log("adding like to tileset")
                    tileset.likes.push(auth.user._id)
                }
                const responseGeneral = await api.updateTilesetGeneral(tilesetId, tileset)
                if (responseGeneral.data.success) {
                    store.loadUserTilesets()
                    store.loadPublicTilesets()
                }
            }
        } catch (error) {
            console.log("Error updating tileset likes: ", error)
        }
    }
    // increment or decrement the number of dislikes by removing user_id from likes array
    store.updateTilesetDislikes = async (tilesetId) => {
        try {
            const response = await api.getTilesetById(tilesetId)
            if (response.data.success) {
                const tileset = response.data.tileset
                if (tileset.dislikes.includes(auth.user._id)) {
                    console.log("Removing dislike to tileset")
                    tileset.dislikes.splice(tileset.dislikes.indexOf(auth.user._id), 1)
                } else {
                    console.log("adding dislike to tileset")
                    tileset.dislikes.push(auth.user._id)
                }
                const responseGeneral = await api.updateTilesetGeneral(tilesetId, tileset)
                if (responseGeneral.data.success) {
                    store.loadUserTilesets();
                    store.loadPublicTilesets();
                }
            }
        } catch (error) {
            console.log("Error updating tileset dislikes: ", error)
        }
    }
    // add a comment to a piece of content TODO BUILD 4
    store.addComment = async () => {

    }
    // this content will be opened for editing
    store.openContentEditView = function () {

    }
    // this content is closed from editing
    store.closeContentEditView = function () {

    }
    // this content is expanded to show data and comments
    store.expandContentComments = function () {

    }
    // this content is collapsed to hide data and comments
    store.closeContentComments = function () {

    }
    // this content is set to be public
    store.setContentPublic = async () => {
        
    }
    // create a new map, open map editor
    store.createNewMap = async (title, height, width, tileSize) => {
        try {
            let owner = auth.user
            let response = await api.createMap(owner, title, height, width, tileSize);
            if (response.data.success) {
                // open map editor with newly created map
                // handle it differently for now by refreshing user's maps
                store.loadUserMaps();
            }
        } catch (error) {
            console.log("Error creating new map: ", error);
        }
    }
    // create new tileset, open tileset editor
    store.createNewTileset = async (title, tileSize) => {
        try {
            let response = await api.createTileset(auth.user._id, title, tileSize);
            if (response.data.success) {
                // open tileset editor with newly created tileset
                // handle it differently for now by refreshing user's tilesets
                store.loadUserTilesets();
            }
        } catch (error) {
            console.log("Error creating new tileset: ", error);
        }
    }
    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    )
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };