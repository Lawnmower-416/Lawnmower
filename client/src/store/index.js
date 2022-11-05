import { createContext, useContext, useState } from "react";
import api from "./store-request-api";
import AuthContext from "./AuthContext";


export const GlobalStoreContext = createContext();

export const GlobalStoreActionType = {
    LOAD_USER_MAPS: "LOAD_USER_MAPS",
    LOAD_USER_TILESETS: "LOAD_USER_TILESETS",
    LOAD_PUBLIC_MAPS: "LOAD_PUBLIC_MAPS",
    LOAD_PUBLIC_TILESETS: "LOAD_PUBLIC_TILESETS",
    LOAD_COMMENTS: "LOAD_COMMENTS",
    SORT_PUBLIC_MAPS: "SORT_PUBLIC_MAPS",
    SORT_PUBLIC_TILESETS: "SORT_PUBLIC_TILESETS",
    MARK_MAP_FOR_DELETION: "MARK_MAP_FOR_DELETION",
    UNMARK_MAP_FOR_DELETION: "UNMARK_MAP_FOR_DELETION",
    MARK_TILESET_FOR_DELETION: "MARK_TILESET_FOR_DELETION",
    UNMARK_TILESET_FOR_DELETION: "UNMARK_TILESET_FOR_DELETION",
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
        mapMarkedForDeletion: null,
        tilesetMarkedForDeletion: null,
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: store.tilesetMarkedForDeletion,
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: store.tilesetMarkedForDeletion,
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: store.tilesetMarkedForDeletion,
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: store.tilesetMarkedForDeletion,
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: store.tilesetMarkedForDeletion,
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: store.tilesetMarkedForDeletion,
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: store.tilesetMarkedForDeletion,
                });
            }
            case GlobalStoreActionType.MARK_MAP_FOR_DELETION: {
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
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                    mapMarkedForDeletion: payload.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: store.tilesetMarkedForDeletion,
                });
            }
            case GlobalStoreActionType.MARK_TILESET_FOR_DELETION: {
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
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: payload.tilesetMarkedForDeletion,
                });
            }
            case GlobalStoreActionType.UNMARK_MAP_FOR_DELETION: {
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
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                    mapMarkedForDeletion: null,
                    tilesetMarkedForDeletion: store.tilesetMarkedForDeletion,
                });
            }
            case GlobalStoreActionType.UNMARK_TILESET_FOR_DELETION: {
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
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: null,
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: store.tilesetMarkedForDeletion,
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
                    mapMarkedForDeletion: store.mapMarkedForDeletion,
                    tilesetMarkedForDeletion: store.tilesetMarkedForDeletion,
                });
            }
        }
    }
    // load the user's maps in their profile
    store.loadUserMaps = async () => {
        try {
            let userMapIds = auth.user.maps
            let userMaps = []
            for (let i = 0; i < userMapIds.length; i++) {
                let map = await api.getMap(userMapIds[i])
                userMaps.push(map)
            }
            storeReducer({
                type: GlobalStoreActionType.LOAD_USER_MAPS,
                payload: {
                    userMaps: userMaps
                }
            })
        } catch (error) {
            console.log("Error loading user maps: ", error)
        }
    }
    // load the user's tilesets in their profile
    store.loadUserTilesets = async () => {
        try {
            let userTilesetIds = auth.user.tilesets
            let userTilesets = []
            for (let i = 0; i < userTilesetIds.length; i++) {
                let tileset = await api.getTileset(userTilesetIds[i])
                userTilesets.push(tileset)
            }
            storeReducer({
                type: GlobalStoreActionType.LOAD_USER_TILESETS,
                payload: {
                    userTilesets: userTilesets
                }
            })
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
    // mark a map for deletion
    store.markMapForDeletion = async (mapId) => {
        try {
            let response = await api.getMapById(mapId)
            if (response.data.succes) {
                storeReducer({
                    type: GlobalStoreActionType.MARK_MAP_FOR_DELETION,
                    payload: {
                        mapToDelete: response.data.map
                    }
                })
            }
        } catch (error) {
            console.log("Error marking map for deletion: ", error)
        }
    }
    // unmark a map for deletion
    store.unmarkMapForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_MAP_FOR_DELETION
        })
    }
    // mark a tileset for deletion
    store.markTilesetForDeletion = async (tilesetId) => {
        try {
            let response = await api.getTilesetById(tilesetId)
            if (response.data.succes) {
                storeReducer({
                    type: GlobalStoreActionType.MARK_TILESET_FOR_DELETION,
                    payload: {
                        tilesetToDelete: response.data.tileset
                    }
                })
            }
        } catch (error) {
            console.log("Error marking tileset for deletion: ", error)
        }
    }
    // unmark a tileset for deletion
    store.unmarkTilesetForDeletion = function () {
        storeReducer({
            type: GlobalStoreActionType.UNMARK_TILESET_FOR_DELETION
        })
    }
    // delete a map
    store.deleteMap = async function (mapId) {
        try {
            let deletedMap = await api.deleteMap(mapId)
            // probably have to add some refresh thing here
            // refresh both profile and community pages
        } catch (error) {
            console.log("Error deleting map: ", error)
        }
    }
    // delete a tileset
    store.deleteTileset = async function (tilesetId) {
        try {
            let deletedTileset = await api.deleteTileset(tilesetId)
            // probably have to add some refresh thing here
            // refresh both profile and community pages
        } catch (error) {
            console.log("Error deleting tileset: ", error)
        }
    }
    // increment or decrement the number of likes by removing user_id from likes array
    store.updateMapLikes = async (mapId) => {
        
    }
    // increment or decrement the number of dislikes by removing user_id from likes array
    store.updateMapDislikes = async () => {

    }
    // increment or decrement the number of likes by removing user_id from likes array
    store.updateTilesetLikes = async (tilesetId) => {

    }
    // increment or decrement the number of dislikes by removing user_id from likes array
    store.updateTilesetDislikes = async (tilesetId) => {

    }
    // add a comment to a piece of content
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
    store.createNewMap = async () => {
    
    }
    // create new tileset, open tileset editor
    store.createNewTileset = async () => {

    }
}

