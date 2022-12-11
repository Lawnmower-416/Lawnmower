/* eslint-disable default-case */
import { createContext, useContext, useState } from "react";
import api from "./../requests/store-request";
import AuthContext from "../auth";
import { useNavigate, useLocation } from "react-router-dom";
import {uploadTilesetImage} from "../requests/tileset-editor-api";


export const GlobalStoreContext = createContext();

export const GlobalStoreActionType = {
    LOAD_USER_CONTENT: "LOAD_USER_CONTENT",
    LOAD_PUBLIC_CONTENT: "LOAD_PUBLIC_CONTENT",
    LOAD_USER_MAPS: "LOAD_USER_MAPS",
    LOAD_USER_TILESETS: "LOAD_USER_TILESETS",
    LOAD_PUBLIC_MAPS: "LOAD_PUBLIC_MAPS",
    LOAD_PUBLIC_TILESETS: "LOAD_PUBLIC_TILESETS",
    LOAD_COMMENTS: "LOAD_COMMENTS",
    CREATE_NEW_MAP: "CREATE_NEW_MAP",
    CREATE_NEW_TILESET: "CREATE_NEW",
    EDITING_MAP: "EDITING_MAP",
    EDITING_TILESET: "EDITING_TILESET",
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
        currentMapEditing: null,
        currentTilesetEditing: null,
        currentContentCommentsExpanded: null,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const { auth } = useContext(AuthContext);

    const location = useLocation();
    const path = location.pathname;

    const history = useNavigate();

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.LOAD_USER_CONTENT:
                return setStore({
                    userMaps: payload.userMaps,
                    userTilesets: payload.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    currentMapEditing: store.currentMapEditing,
                    currentTilesetEditing: store.currentTilesetEditing,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                });
            case GlobalStoreActionType.LOAD_PUBLIC_CONTENT:
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: payload.publicMaps,
                    publicTilesets: payload.publicTilesets,
                    comments: store.comments,
                    currentMapEditing: store.currentMapEditing,
                    currentTilesetEditing: store.currentTilesetEditing,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                });
            case GlobalStoreActionType.LOAD_PUBLIC_MAPS: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: payload.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    currentMapEditing: store.currentMapEditing,
                    currentTilesetEditing: store.currentTilesetEditing,
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
                    currentMapEditing: store.currentMapEditing,
                    currentTilesetEditing: store.currentTilesetEditing,
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
                    currentMapEditing: store.currentMapEditing,
                    currentTilesetEditing: store.currentTilesetEditing,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                });
            }
            case GlobalStoreActionType.EDITING_MAP: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    currentMapEditing: payload.editingMap,
                    currentTilesetEditing: store.currentTilesetEditing,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                });
            }
            case GlobalStoreActionType.EDITING_TILESET: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    currentMapEditing: store.currentMapEditing,
                    currentTilesetEditing: payload.editingTileset,
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
                    currentMapEditing: store.currentMapEditing,
                    currentTilesetEditing: store.currentTilesetEditing,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded,
                });
            }
            case GlobalStoreActionType.CREATE_NEW_MAP: {
                return setStore({
                    userMaps: payload.userMaps,
                    userTilesets: store.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    currentMapEditing: payload.currentMapEditing,
                    currentTilesetEditing: store.currentTilesetEditing,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded
                });
            }
            case GlobalStoreActionType.CREATE_NEW_TILESET: {
                return setStore({
                    userMaps: store.userMaps,
                    userTilesets: payload.userTilesets,
                    userComments: store.userComments,
                    publicMaps: store.publicMaps,
                    publicTilesets: store.publicTilesets,
                    comments: store.comments,
                    currentMapEditing: store.currentMapEditing,
                    currentTilesetEditing: payload.currentTilesetEditing,
                    currentContentCommentsExpanded: store.currentContentCommentsExpanded
                });
            }
        }
    }

    // loads the mapId's found in auth.user.maps into actual map objects into store.userMaps
    // to update content in the profile screen, push/splice the auth.user.maps array and then call this function
    store.loadUserContent = async () => {
        try {
            let userMapIds = auth.user.maps || [];
            let mapPromises= []
            for (let i = 0; i < userMapIds.length; i++) {
                mapPromises.push((api.getMapById(userMapIds[i])));
            }

            if (mapPromises.length >= 0) {
                Promise.all(mapPromises).then((maps) => {
                    let returnMaps = [];

                    for (let i = 0; i < maps.length; i++) {
                        returnMaps.push(maps[i].data.map);
                    }

                    let userTilesetIds = auth.user.tilesets || [];
                    let tilesetPromises = [];
                    for (let i = 0; i < userTilesetIds.length; i++) {
                        tilesetPromises.push((api.getTilesetById(userTilesetIds[i])));
                    }
                    if (tilesetPromises.length >= 0) {
                        Promise.all(tilesetPromises).then((tilesets) => {
                            let returnTilesets = [];
                            for (let i = 0; i < tilesets.length; i++) {
                                returnTilesets.push(tilesets[i].data.tileset);
                            }
                            storeReducer({
                                type: GlobalStoreActionType.LOAD_USER_CONTENT,
                                payload: {
                                    userMaps: returnMaps,
                                    userTilesets: returnTilesets
                                }
                            })
                        })
                    }
                });
            }
        } catch (error) {
            console.log("Error loading content. This can be bc no user is logged in");
        }
    }
    // gets every single PUBLIC content and puts then into store.publicMaps and store.publicTilesets
    store.loadPublicContent = async () => {
        try {
            let allMaps = await api.getMaps(); //only public maps
            let publicMaps = []
            for (let i = 0; i < allMaps.data.maps.length; i++) {
                if (allMaps.data.maps[i].public) {
                    publicMaps.push(allMaps.data.maps[i]);
                }
            }
            let shownMaps = publicMaps.sort((a, b) => {
                return (b.likedUsers.length - b.dislikedUsers.length) - (a.likedUsers.length - a.dislikedUsers.length);
            })

            let allTilesets = await api.getTilesets(); //only public tilesets
            let publicTilesets = []
            for (let i = 0; i < allTilesets.data.tilesets.length; i++) {
                if (allTilesets.data.tilesets[i].public) {
                    publicTilesets.push(allTilesets.data.tilesets[i]);
                }
            }
            let shownTilesets = publicTilesets.sort((a, b) => {
                return (b.likedUsers.length - b.dislikedUsers.length) - (a.likedUsers.length - a.dislikedUsers.length);
            })
            storeReducer({
                type: GlobalStoreActionType.LOAD_PUBLIC_CONTENT,
                payload: {
                    publicMaps: shownMaps,
                    publicTilesets: shownTilesets
                }
            })
        } catch (error) {
            console.log("Error loading public content: ", error)
        }
    }
    // sort the public maps by a certain criteria
    store.sortPublicContent = function (criteria) {
        let publicMaps = store.publicMaps;
        let publicTilesets = store.publicTilesets;
        // sort by Likes, Creator, Date Created, Comments, Views, Tags (secondary sort by likes)
        switch (criteria) {
            case "Likes": //default
                console.log("sorting by likes");
                publicMaps.sort((a, b) => {
                    return (b.likedUsers.length - b.dislikedUsers.length) - (a.likedUsers.length - a.dislikedUsers.length);
                })
                publicTilesets.sort((a, b) => {
                    return (b.likedUsers.length - b.dislikedUsers.length) - (a.likedUsers.length - a.dislikedUsers.length);
                })
                break
            case "Creator":
                console.log("sorting by creator");
                publicMaps.sort((a, b) => {
                    return a.ownerUsername.localeCompare(b.ownerUsername)
                })
                publicTilesets.sort((a, b) => {
                    return a.ownerUsername.localeCompare(b.ownerUsername)
                })
                break
            case "Date Created":
                console.log("sorting by date created");
                publicMaps.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })
                publicTilesets.sort((a, b) => {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                })
                break
            case "Comments":
                console.log("sorting by number of comments");
                publicMaps.sort((a, b) => {
                    return b.comments.length - a.comments.length
                })
                publicTilesets.sort((a, b) => {
                    return b.comments.length - a.comments.length
                })
                break
            case "Views":
                console.log("sorting by number of views");
                publicMaps.sort((a, b) => {
                    return b.viewers.length - a.viewers.length
                })
                publicTilesets.sort((a, b) => {
                    return b.viewers.length - a.viewers.length
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
            type: GlobalStoreActionType.LOAD_PUBLIC_CONTENT,
            payload: {
                publicMaps: publicMaps,
                publicTilesets: publicTilesets
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
                auth.user.maps = auth.user.maps.filter(map => map !== mapId)
                store.loadUserContent();
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
                auth.user.tilesets = auth.user.tilesets.filter(tileset => tileset !== tilesetId)
                store.loadUserContent()
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
                if (map.likedUsers.includes(auth.user._id)) {
                    map.likedUsers.splice(map.likedUsers.indexOf(auth.user._id), 1)
                } else {
                    map.likedUsers.push(auth.user._id)
                    if (map.dislikedUsers.includes(auth.user._id)) {
                        map.dislikedUsers.splice(map.dislikedUsers.indexOf(auth.user._id), 1)
                    }
                }
                const responseGeneral = await api.updateMapGeneral(mapId, map)
                if (responseGeneral.data.success) {
                    if (path.slice(0,8) === "/profile") {
                        store.loadUserContent()
                    }
                    if (path === "/community") {
                        store.loadPublicContent()
                    }
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
                if (map.dislikedUsers.includes(auth.user._id)) {
                    map.dislikedUsers.splice(map.dislikedUsers.indexOf(auth.user._id), 1)
                } else {
                    map.dislikedUsers.push(auth.user._id)
                    if (map.likedUsers.includes(auth.user._id)) {
                        map.likedUsers.splice(map.likedUsers.indexOf(auth.user._id), 1)
                    }
                }
                const responseGeneral = await api.updateMapGeneral(mapId, map)
                if (responseGeneral.data.success) {
                    if (path.slice(0,8) === "/profile") {
                        store.loadUserContent()
                    }
                    if (path === "/community") {
                        store.loadPublicContent()
                    }
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
                if (tileset.likedUsers.includes(auth.user._id)) {
                    tileset.likedUsers.splice(tileset.likedUsers.indexOf(auth.user._id), 1)
                } else {
                    tileset.likedUsers.push(auth.user._id)
                    if (tileset.dislikedUsers.includes(auth.user._id)) {
                        tileset.dislikedUsers.splice(tileset.dislikedUsers.indexOf(auth.user._id), 1)
                    }
                }
                const responseGeneral = await api.updateTilesetGeneral(tilesetId, tileset)
                if (responseGeneral.data.success) {
                    if (path.slice(0,8) === "/profile") {
                        store.loadUserContent()
                    }
                    if (path === "/community") {
                        store.loadPublicContent()
                    }
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
                if (tileset.dislikedUsers.includes(auth.user._id)) {
                    tileset.dislikedUsers.splice(tileset.dislikedUsers.indexOf(auth.user._id), 1)
                } else {
                    tileset.dislikedUsers.push(auth.user._id)
                    if (tileset.likedUsers.includes(auth.user._id)) {
                        tileset.likedUsers.splice(tileset.likedUsers.indexOf(auth.user._id), 1)
                    }
                }
                const responseGeneral = await api.updateTilesetGeneral(tilesetId, tileset)
                if (responseGeneral.data.success) {
                    if (path.slice(0,8) === "/profile") {
                        store.loadUserContent()
                    }
                    if (path === "/community") {
                        store.loadPublicContent()
                    }
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
            let ownerUsername = auth.user.username
            let response = await api.createMap(owner, ownerUsername, title, height, width, tileSize);
            if (response.data.success) {
                // open map editor with newly created map
                // handle it differently for now by refreshing user's maps
                auth.user.maps.push(response.data.map._id)
                store.loadUserContent()
                history("/mapEditor/" + response.data.map._id)
                
            }
        } catch (error) {
            console.log("Error creating new map: ", error);
        }
    }
    // create new tileset, open tileset editor
    store.createNewTileset = async (title, tileSize) => {
        try {
            let owner = auth.user
            let ownerUsername = auth.user.username
            let response = await api.createTileset(owner, ownerUsername, title, tileSize);
            if (response.data.success) {
                // open tileset editor with newly created tileset
                // handle it differently for now by refreshing user's tilesets
                auth.user.tilesets.push(response.data.tileset._id)
                store.loadUserContent()
                history("/tilesetEditor/" + response.data.tileset._id)
            }
        } catch (error) {
            console.log("Error creating new tileset: ", error);
        }
    }

    store.importTileset = async (title, tileSize, tilesetImage) => {
        let owner = auth.user
        let ownerUsername = auth.user.username
        let response = await api.createTileset(owner, ownerUsername, title, tileSize).catch((error) => {
            console.log(error);
            return {data: {success: false, error: error}}
        });
        if (response.data.success) {
            auth.user.tilesets.push(response.data.tileset._id)
            store.loadUserContent();
            const stringImage = JSON.stringify(tilesetImage);
            const res = await uploadTilesetImage(response.data.tileset._id, stringImage);
            history("/tilesetEditor/" + response.data.tileset._id)
        } else {
            console.log(response.data.error);
        }

    }

    // update view count
    store.updateMapViewCount = async (mapId) => {
        try {
            const response = await api.getMapById(mapId);
            if (response.data.success) {
                const map = response.data.map;
                if (!map.viewers.includes(auth.user._id)) {
                    map.viewers.push(auth.user._id)
                    const responseGeneral = await api.updateMapGeneral(mapId, map)
                    if (responseGeneral.data.success) {
                        if (path === "/profile") {
                            store.loadUserContent()
                        }
                        if (path === "/community") {
                            store.loadPublicContent()
                        }
                    }
                }
            }
        } catch (error) {
            console.log("Error updating map view count: ", error);
        }
    }
    store.updateTilesetViewCount = async (tilesetId) => {
        try {
            const response = await api.getTilesetById(tilesetId);
            if (response.data.success) {
                const tileset = response.data.tileset;
                if (!tileset.viewers.includes(auth.user._id)) {
                    tileset.viewers.push(auth.user._id)
                    const responseGeneral = await api.updateTilesetGeneral(tilesetId, tileset)
                    if (responseGeneral.data.success) {
                        if (path === "/profile") {
                            store.loadUserContent()
                        }
                        if (path === "/community") {
                            store.loadPublicContent()
                        }
                    }
                }
            }
        } catch (error) {
            console.log("Error updating tileset view count: ", error);
        }
    }

    store.reportUser = async (reporter, reportee, reason) => {
        try {
            const response = await api.reportUser(reporter, reportee._id, reason);
            if (!response.data.success) {
                console.log("Repored User Failed...");
            } else {
                // Success
                // alert("User Reported!");
                setErrorMessage("Reported User " + reportee.username);
            }
        } catch (error) {
            console.log("Error with reporting user. ", err);
        }
    }

    store.wipeErrorMessage = () => {
        setErrorMessage("");
    }

    store.getErrorMessage = () => {
        return errorMessage;
    }

    store.setErrorMessage = (message) => {
        setErrorMessage(message);
    }
    store.forkMap = async (mapId) => {
        try {
            const response = await api.getMapById(mapId);
            if (response.data.success) {
                const map = response.data.map;
                let owner = auth.user
                let ownerUsername = auth.user.username
                let responseFork = await api.forkMap(map, owner, ownerUsername);
                if (responseFork.data.success) {
                    // open map editor with newly created map
                    // handle it differently for now by refreshing user's maps
                    auth.user.maps.push(responseFork.data.map._id)
                    store.loadUserContent()
                    history("/mapEditor/" + responseFork.data.map._id)

                }
            }
        } catch (error) {
            console.log("Error forking map: ", error);
        }
    }

    store.forkTileset = async (tilesetId) => {
        try {
            const response = await api.getTilesetById(tilesetId);
            if (response.data.success) {
                const tileset = response.data.tileset;
                let owner = auth.user
                let ownerUsername = auth.user.username
                let responseFork = await api.forkTileset(tileset, owner, ownerUsername);
                if (responseFork.data.success) {
                    // open tileset editor with newly created tileset
                    // handle it differently for now by refreshing user's tilesets
                    auth.user.tilesets.push(responseFork.data.tileset._id)
                    store.loadUserContent()
                    history("/tilesetEditor/" + responseFork.data.tileset._id)
                }
            }
        } catch (error) {
            console.log("Error forking tileset: ", error);
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