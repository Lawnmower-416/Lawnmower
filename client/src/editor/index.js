import { createContext, useContext, useState } from 'react';
import mapApi from "../requests/map-editor-api"
import tilesetApi from "../requests/tileset-api"
import { useAuth } from "../auth"

export const EditorContext = createContext();

export const EditorActionType = {
    GET_CAN_EDIT: "GET_CAN_EDIT",
    GET_CURRENT_TOOL: "GET_CURRENT_TOOL",
    SET_CURRENT_TOOL: "SET_CURRENT_TOOL",
    GET_CURRENT_ITEM: "GET_CURRENT_ITEM",
    SET_CURRENT_ITEM: "SET_CURRENT_ITEM",
    ADD_TRANSACTION: "ADD_TRANSACTION",
    PROCESS_UNDO: "PROCESS_UNDO",
    PROCESS_REDO: "PROCESS_REDO",
    SELECT_REGION: "SELECT_REGION",
    PLACE_TILE: "PLACE_TILE",
    SELECT_LAYER: "SELECT_LAYER",
    ADD_LAYER: "ADD_LAYER",
    DELETE_LAYER: "DELETE_LAYER",
    RENAME_LAYER: "RENAME_LAYER",
    ADD_PROP: "ADD_PROP",
    CHANGE_PROP_TYPE: "CHANGE_PROP_TYPE",
    CHANGE_PROP_VALUE: "CHANGE_PROP_VALUE",
    EXPORT: "EXPORT",
    CHANGE_SETTINGS: "CHANGE_SETTINGS",
    DOWNLOAD_OLD_VERSION: "DOWNLOAD_OLD_VERSION",
    IMPORT_TILESET: "IMPORT_TILESET",
}

function EditorContextProvider(props) {
    const [ store, setStore ] = useState({
        map: null,
        map_tilesets: [],
        current_layer: 0,
        layers: [],

        tileset: null,
        tiles: [],

        currentTool: "SELECT_TOOL",
        currentItem: null,
        transactionStack: [],
        selectedTiles: [],
    });
    const { auth } = useContext(AuthContext);

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
        
        }
    }

    // returns if the user has permission to edit
    store.getCanEdit = async () => {
    
    }
    // returns the currently chosen tool
    store.getCurrentTool = () => {

    }
    // sets the current tool
    store.setCurrentTool = (tool) => {
    
    }
    // returns the currently chosen tile/color
    store.getCurrentItem = () => {
    
    }
    // sets the current tile/color
    store.setCurrentItem = (item) => {

    }
    // adds a new transaction to the stack
    store.addTransaction = (transaction) => {
    
    }
    // processes an undo for the last transaction
    store.processUndo = () => {

    }
    // processes a redo for the last transaction
    store.processRedo = () => {

    }
    // unselects all selected tiles
    store.unselectAll = () => {

    }
    // selects the given tile(s)
    store.selectTiles = (tile) => {

    }
    // places a tile at given coordinate(s)
    store.placeTile = async (tile, coordinates) => {

    }
    // handles selecting a layer
    store.selectLayer = (layer) => {

    }
    // handles adding a layer
    store.addLayer = async (layer) => {

    }
    // handles deleting a layer
    store.deleteLayer = async (layer) => {
    
    }
    // handles locking/unlocking a layer
    store.toggleLayerLock = (layer) => {

    }
    // handles showing/hiding a layer
    store.toggleLayerHide = (layer) => {

    }
    // handles adding a new property
    store.addProp = async (prop) => {

    }
    // handles renaming a property
    store.renameProp = async (prop) => {

    }
    // handles changing a property's type
    store.changePropType = async (prop, type) => {
    
    }
    // handles changing a property's value
    store.changePropValue = async (prop, value) => {

    }
    // handles deleting a property
    store.deleteProp = async (prop) => {

    }
    // handles exporting tileset/map
    store.export = async (id) => {

    }
    // handles changing settings
    store.changeSettings = async (name, length, width) => {

    }
    // handles downloading a prior version of the content
    store.exportVersion = async (versionId) => {

    }
    // handles importing a tileset
    store.importTileset = async (tilesetId) => {

    }
    return (
        <EditorContext.Provider value={{ 
            store 
        }}>
            {props.children}
        </EditorContext.Provider>
    )
    
}

export default EditorContext;
export { EditorContextProvider };