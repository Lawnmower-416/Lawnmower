import {createContext, useContext, useEffect, useState} from 'react';
import mapApi from "../../src/requests/map-editor-api";
import tilesetApi, {getTilesetImage, uploadTilesetImage} from "../../src/requests/tileset-editor-api";
import { useAuth } from "../auth"
import AuthContext from '../auth';
import {getTilesetById} from "../requests/store-request";


export const EditorContext = createContext();

export const EditorActionType = {
    GET_CAN_EDIT: "GET_CAN_EDIT",
    SET_CURRENT_TOOL: "SET_CURRENT_TOOL",
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
    SET_TILESET: "SET_TILESET",
    SET_COLOR: "SET_COLOR",
    LOAD_COLORS: "LOAD_COLORS",
    ADD_COLOR: "ADD_COLOR",
    SELECT_PIXEL: "SELECT_PIXEL",
    ADD_SELECTED_PIXEL: "ADD_SELECTED_PIXEL",
    EDIT_TILE: "EDIT_TILE",
    SAVE_TILESET: "SAVE_TILESET",
    ADD_TILE: "ADD_TILE",
    SET_CURRENT_TILE: "SET_CURRENT_TILE",
}

export const EditorTool = {
    SELECT: "SELECT",
    PAINT: "PAINT",
    FILL: "FILL",
    PICKER: "PICKER", //TODO: Implement
    REGION: "REGION",
}

function EditorContextProvider(props) {
    const [ store, setStore ] = useState({
        map: null,
        map_tilesets: [],
        current_layer: 0,
        layers: [],

        tileset: null,
        tilesetImage: null,
        currentColor: {red: 0, green: 0, blue: 0, alpha: 255},
        colors: [],
        currentTileIndex: 0,

        currentTool: EditorTool.SELECT,
        currentItem: null,
        transactionStack: [],
        selectedTiles: [],
        selectedPixels: [],
    });
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        store.loadColors();
    }, []);

    useEffect(() => {
        store.saveColors();
    }, [store.colors]);

    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case EditorActionType.SET_CURRENT_TOOL:
                setStore({
                    ...store,
                    currentTool: payload.tool,
                    selectedPixels: payload.selectedPixels ? payload.selectedPixels : [],
                });
                break;

            case EditorActionType.SET_TILESET:
                setStore({
                    ...store,
                    tileset: payload.tileset,
                    tilesetImage: payload.tilesetImage,
                });
                break;

            case EditorActionType.SET_COLOR:
                setStore({
                    ...store,
                    currentColor: payload.color,
                });
                break;

            case EditorActionType.LOAD_COLORS:
                setStore({
                    ...store,
                    colors: payload.colors,
                });
                break;

            case EditorActionType.ADD_COLOR:
                setStore({
                    ...store,
                    colors: [...store.colors, payload.color],
                });
                break;

            case EditorActionType.SELECT_PIXEL:
                setStore({
                    ...store,
                    selectedPixels: [payload.pixel],
                });
                break;

            case EditorActionType.ADD_SELECTED_PIXEL:
                setStore({
                    ...store,
                    selectedPixels: [...store.selectedPixels, payload.pixel],
                });
                break;

            case EditorActionType.EDIT_TILE:
                setStore({
                    ...store,
                    tileset: payload.tileset,
                    tilesetImage: payload.tilesetImage,
                });
                break;

            case EditorActionType.ADD_TILE:
                setStore({
                    ...store,
                    tilesetImage: payload.tilesetImage
                });
                break;

            case EditorActionType.SET_CURRENT_TILE:
                setStore({
                    ...store,
                    currentTileIndex: payload.index,
                });
                break;

            default:
                console.error("Unknown action type: " + type);
                break;
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
        let selectedPixels = null;

        switch (tool) {
            case EditorTool.PAINT:
                selectedPixels = store.selectedPixels;
                break;
            case EditorTool.FILL:
                selectedPixels = store.selectedPixels;
                break;
            default:
                selectedPixels = [];
        }

        storeReducer({
            type: EditorActionType.SET_CURRENT_TOOL,
            payload: {
                tool: tool,
                selectedPixels: selectedPixels,
            }
        });
    }

    store.setCurrentTile = (tileIndex) => {
        storeReducer({
            type: EditorActionType.SET_CURRENT_TILE,
            payload: {
                index: tileIndex,
            }
        });
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

    store.setTileset = async (tilesetId) => {
        const res = await getTilesetById(tilesetId);

        if (res.status === 200) {
            const {tileset} = res.data;

            //TODO: Error handling
            const image = await getTilesetImage(tilesetId);
            const imageData = image.data.tilesetImage
            storeReducer({
                type: EditorActionType.SET_TILESET,
                payload: {
                    tileset: tileset,
                    tilesetImage: imageData,
                }
            })
        }
    }

    store.setColor = (color) => {
        storeReducer({
            type: EditorActionType.SET_COLOR,
            payload: {
                color: color,
            },
        })
    }

    store.saveColors = () => {
        localStorage.setItem('colors', JSON.stringify(store.colors));
    }

    store.loadColors = () => {
        const colors = JSON.parse(localStorage.getItem('colors'));
        if (colors) {
            storeReducer({
                type: EditorActionType.LOAD_COLORS,
                payload: {
                    colors: colors,
                },
            })
        }
    }

    store.addColor = (color) => {
        storeReducer({
            type: EditorActionType.ADD_COLOR,
            payload: {
                color: color,
            },
        });
    }

    store.addTile = async () => {
        const tileSize = store.tileset.tileSize;
        const canvas = document.createElement('canvas');
        canvas.width = tileSize;
        canvas.height = tileSize;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(0, 0, tileSize, tileSize);
        const imageData = ctx.getImageData(0, 0, tileSize, tileSize);
        const data = JSON.parse(JSON.stringify(imageData.data));
        const newImage = [...store.tilesetImage.tiles, {data}];
        storeReducer({
            type: EditorActionType.ADD_TILE,
            payload: {
                tilesetImage: { tiles: newImage }
            }
        });
    }

    store.editTile = (tileIndex, x, y, color) => {
        const tile = store.tilesetImage.tiles[tileIndex];
        const redIndex = y * (store.tileset.tileSize * 4) + x * 4;
        const greenIndex = redIndex + 1;
        const blueIndex = redIndex + 2;
        const alphaIndex = redIndex + 3;

        tile[redIndex] = color.red;
        tile[greenIndex] = color.green;
        tile[blueIndex] = color.blue;
        tile[alphaIndex] = color.alpha;

        storeReducer({
            type: EditorActionType.EDIT_TILE,
            payload: {
                tileIndex: tileIndex,
                tile: tile,
            }
        })
    }

    //fast flood fill algorithm
    store.floodFill = (tileIndex, x, y, color) => {
        const tile = store.tilesetImage.tiles[tileIndex];
        const redIndex = y * (store.tileset.tileSize * 4) + x * 4;
        const greenIndex = redIndex + 1;
        const blueIndex = redIndex + 2;
        const alphaIndex = redIndex + 3;

        const oldColor = {
            red: tile[redIndex],
            green: tile[greenIndex],
            blue: tile[blueIndex],
            alpha: tile[alphaIndex],
        }

        const stack = [[x, y]];

        while (stack.length > 0) {
            const [x, y] = stack.pop();

            const redIndex = y * (store.tileset.tileSize * 4) + x * 4;
            const greenIndex = redIndex + 1;
            const blueIndex = redIndex + 2;
            const alphaIndex = redIndex + 3;

            const currentColor = {
                red: tile[redIndex],
                green: tile[greenIndex],
                blue: tile[blueIndex],
                alpha: tile[alphaIndex],
            }

            if (currentColor.red === oldColor.red &&
                currentColor.green === oldColor.green &&
                currentColor.blue === oldColor.blue &&
                currentColor.alpha === oldColor.alpha) {
                tile[redIndex] = color.red;
                tile[greenIndex] = color.green;
                tile[blueIndex] = color.blue;
                tile[alphaIndex] = color.alpha;

                if (x > 0) {
                    stack.push([x - 1, y]);
                }
                if (x < store.tileset.tileSize - 1) {
                    stack.push([x + 1, y]);
                }
                if (y > 0) {
                    stack.push([x, y - 1]);
                }
                if (y < store.tileset.tileSize - 1) {
                    stack.push([x, y + 1]);
                }
            }
        }

        storeReducer({
            type: EditorActionType.EDIT_TILE,
            payload: {
                tileIndex: tileIndex,
                tile: tile,
            }
        })
    }

    store.selectPixel = (pixel) => {
        storeReducer({
            type: EditorActionType.SELECT_PIXEL,
            payload: {
                pixel: pixel,
            },
        })
    }

    store.addSelectedPixel = (pixel) => {
        storeReducer({
            type: EditorActionType.ADD_SELECTED_PIXEL,
            payload: {
                pixel: pixel,
            },
        })
    }

    store.saveTileset = async () => {
        const stringImage = JSON.stringify(store.tilesetImage);
        const res = await uploadTilesetImage(store.tileset._id, stringImage);

        if (res.status === 200) {
            console.log('Tileset saved');
        } else {
            console.log('Error saving tileset');
        }
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