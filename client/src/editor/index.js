import {createContext, useEffect, useState} from 'react';
import {getTileset, getTilesetImage, updateTileset, uploadTilesetImage} from "../../src/requests/tileset-editor-api";
import {getMapById, getTilesetById} from "../requests/store-request";
import jsTPS from "../transactions/jsTPS";
import {
    addLayer,
    addProperty,
    getAllTilesets,
    getLayer,
    getProperty,
    updateLayer,
    updateMap, updateProperty
} from "../requests/map-editor-api";


export const EditorContext = createContext();

export const EditorActionType = {
    SET_CURRENT_TOOL: "SET_CURRENT_TOOL",
    ADD_TRANSACTION: "ADD_TRANSACTION",
    PROCESS_UNDO: "PROCESS_UNDO",
    PROCESS_REDO: "PROCESS_REDO",
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

    SET_MAP: "SET_MAP",
    SET_CURRENT_LAYER: "SET_CURRENT_LAYER",
    UPDATE_LAYERS: "UPDATE_LAYERS",


    SET_TILESET: "SET_TILESET",
    SET_COLOR: "SET_COLOR",
    LOAD_COLORS: "LOAD_COLORS",
    ADD_COLOR: "ADD_COLOR",
    SELECT_PIXEL: "SELECT_PIXEL",
    ADD_SELECTED_PIXEL: "ADD_SELECTED_PIXEL",
    SET_SELECTED_PIXELS: "SET_SELECTED_PIXELS",
    EDIT_TILE: "EDIT_TILE",
    SAVE_TILESET: "SAVE_TILESET",
    ADD_TILE: "ADD_TILE",
    SET_CURRENT_TILE: "SET_CURRENT_TILE",
    DELETE_TILE: "DELETE_TILE",
}

export const EditorTool = {
    SELECT: "SELECT",
    PAINT: "PAINT",
    FILL: "FILL",
    PICKER: "PICKER", //TODO: Implement
    REGION: "REGION",
}

const tps = new jsTPS();

function EditorContextProvider(props) {
    const [ store, setStore ] = useState({
        map: null,
        mapTilesets: [],
        currentLayer: 0,
        layers: [],
        tiles: [],

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
                    selectedPixels: payload.selectedPixels || [],
                });
                break;

            case EditorActionType.SET_MAP:
                console.log(payload.tiles)
                setStore({
                    ...store,
                    map: payload.map,
                    layers: payload.layers,
                    mapTilesets: payload.mapTilesets,
                    tiles: payload.tiles
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

            case EditorActionType.SET_SELECTED_PIXELS:
                setStore({
                    ...store,
                    selectedPixels: payload.pixels,
                });
                break;

            case EditorActionType.EDIT_TILE:
                setStore({
                    ...store,
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

            case EditorActionType.ADD_TRANSACTION:
                setStore({
                    ...store,
                    transactionStack: [payload.transaction, ...store.transactionStack],
                });
                break;

            case EditorActionType.DELETE_TILE:
                setStore({
                    ...store,
                    currentTileIndex: 0,
                    tilesetImage: payload.tilesetImage,
                });
                break;

            case EditorActionType.ADD_LAYER:
                setStore({
                    ...store,
                    layers: [...store.layers, payload.layer],
                    currentLayer: store.layers.length,
                });
                break;

            case EditorActionType.SET_CURRENT_LAYER:
                setStore({
                    ...store,
                    currentLayer: payload.index,
                });
                break;

            case EditorActionType.UPDATE_LAYERS:
                setStore({
                    ...store,
                    layers: payload.layers,
                });
                break;

            default:
                console.error("Unknown action type: " + type);
                break;
        }
    }

    /**
     * Set the current tool
     * @param tool {EditorTool}
     */
    store.setCurrentTool = (tool) => {
        let selectedPixels;

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

    /**
     * Set current tile
     * @param tileIndex {number}
     */
    store.setCurrentTile = (tileIndex) => {
        storeReducer({
            type: EditorActionType.SET_CURRENT_TILE,
            payload: {
                index: tileIndex,
            }
        });
    }

    /**
     * Add a new transaction to the edit stack
     * @param transaction {jsTPS_Transaction}
     */
    store.addTransaction = (transaction) => tps.addTransaction(transaction);

    /**
     * Undo the last transaction
     */
    store.processUndo = () => tps.undoTransaction();


    /**
     * Redo the last transaction
     */
    store.processRedo = () => tps.doTransaction();

    /**
     * Clear the transaction stack
     */
    store.clearTransactions = () => tps.clearAllTransactions();

    // unselects all selected tiles
    store.unselectAll = () => {

    }

    store.placeTile = async (x, y) => {
        const layers = [...store.layers];
        const layer = layers[store.currentLayer];

        layer.data[y * store.map.width + x] = store.currentTileIndex;

        const res = await updateLayer(store.map._id, layer._id, layer);
        return null;
    }

    /**
     * Flood fill a map with a tile starting at a given coordinate
     * @param startX {number} x-coordinate
     * @param startY {number} y-coordinate
     */
    store.mapFloodFill = async (startX, startY) => {
        const layers = [...store.layers];
        const layer = layers[store.currentLayer];
        const data = layer.data;

        const mapWidth = store.map.width;
        const mapHeight = store.map.height;

        const tileToReplace = data[startY * mapWidth + startX];

        const queue = [[startX, startY]];
        const rerenderList = [];

        while (queue.length > 0) {
            const [x, y] = queue.pop();
            const tileIndex = y * (mapWidth) + x;

            if (data[tileIndex] === tileToReplace) {
                data[tileIndex] = store.currentTileIndex;
                rerenderList.push({x, y});

                if (x > 0) {
                    queue.push([x - 1, y]);
                }
                if (x < mapWidth - 1) {
                    queue.push([x + 1, y]);
                }
                if (y > 0) {
                    queue.push([x, y - 1]);
                }
                if (y < mapHeight - 1) {
                    queue.push([x, y + 1]);
                }
            }
        }

        layer.data = data;

        await updateLayer(store.map._id, layer._id, layer);

        storeReducer({
            type: EditorActionType.UPDATE_LAYERS,
            payload: {
                layers: layers,
            }
        });

        return rerenderList;
    }

    // handles selecting a layer
    store.selectLayer = (layerIndex) => {
        storeReducer({
            type: EditorActionType.SET_CURRENT_LAYER,
            payload: {
                index: layerIndex,
            }
        });
    }
    // handles adding a layer
    store.addLayer = async () => {
        const name = "Layer " + (store.layers.length + 1);
        const layer = (await addLayer(store.map._id, name)).data.layer;

        storeReducer({
            type: EditorActionType.ADD_LAYER,
            payload: {
                layer: layer,
            }
        });
    }
    // handles deleting a layer
    store.deleteLayer = async (layer) => {
    
    }

    store.renameLayer = async (newName) => {
        const layers = [...store.layers];
        const layer = layers[store.currentLayer];
        layer.name = newName;
        await updateLayer(store.map._id, layer._id, layer);

        storeReducer({
            type: EditorActionType.UPDATE_LAYERS,
            payload: {
                layers,
            }
        })
    }
    // handles locking/unlocking a layer
    store.toggleLayerLock = (layerIndex) => {
        const layer = store.layers[layerIndex];
        layer.locked = !layer.locked;
    }
    // handles showing/hiding a layer
    store.toggleLayerHide = (layerIndex) => {
        const layers = [...store.layers];
        const layer = layers[layerIndex];
        layer.visible = !layer.visible;

        storeReducer({
            type: EditorActionType.UPDATE_LAYERS,
            payload: {
                layers,
            }
        });
    }
    // handles adding a new property
    store.addProperty = async () => {
        const layers = [...store.layers];
        const layer = layers[store.currentLayer];
        const name = "Property " + (layer.properties.length + 1);
        const mapId = store.map._id;
        const layerId = layer._id;
        const property = (await addProperty(mapId, layerId, name)).data.property;
        layer.properties.push(property);

        storeReducer({
            type: EditorActionType.UPDATE_LAYERS,
            payload: {
                layers,
            }
        });
    }
    // handles renaming a property
    store.renameProp = async (prop) => {

    }
    // handles changing a property's type
    store.changePropType = async (prop, type) => {
    
    }
    // handles changing a property's value
    store.changePropValue = async (prop, value) => {
        const layers = [...store.layers];
        const layer = layers[store.currentLayer];
        prop.value = value;
        await updateProperty(store.map._id, layer._id, prop._id, prop);

        storeReducer({
            type: EditorActionType.UPDATE_LAYERS,
            payload: {
                layers
            }
        });
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

    store.addTilesetToMap = async (tileset) => {
        const updatedMap = {...store.map, tilesets: [...store.map.tilesets, tileset._id]};
        await updateMap(store.map._id, updatedMap);
        await store.setMap(store.map._id);
    }

    store.setMap = async (mapId) => {
        const res = await getMapById(mapId);

        if (res.status === 200) {
            const {map} = res.data;

            //TODO: Error handling

            const layerPromises = [];
            for (let i = 0; i < map.layers.length; i++) {
                layerPromises.push(getLayer(map._id, map.layers[i]));
            }
            const layersResponses = await Promise.all(layerPromises);

            const layers = [];
            for (let i = 0; i < layersResponses.length; i++) {
                layers.push(layersResponses[i].data.layer);
            }

            for(let i = 0; i < layers.length; i++) {
                const layer = layers[i];
                const layerId = layer._id;
                let propertyPromises = [];
                if(layer.properties) {
                    for(let j = 0; j < layer.properties.length; j++) {
                        propertyPromises.push(getProperty(mapId, layerId, layer.properties[j]));
                    }
                    const propertyResponses = await Promise.all(propertyPromises);

                    const properties = [];
                    for(let j = 0; j < propertyResponses.length; j++) {
                        properties.push(propertyResponses[j].data.property);
                    }
                    layer.properties = properties;
                }
            }

            let tiles = [];
            let mapTilesets = [];
            if(map.tilesets.length > 0) {
                //TODO: Error Handling
                mapTilesets = (await getAllTilesets(map._id)).data.tilesets;
                for (let i = 0; i < mapTilesets.length; i++) {
                    const image = JSON.parse(mapTilesets[i].image);
                    mapTilesets[i].imageData = image
                    tiles.push(...image.tiles);
                }
            }

            storeReducer({
                type: EditorActionType.SET_MAP,
                payload: {
                    map,
                    layers,
                    mapTilesets,
                    tiles
                }
            });
        }
    }

// -------------------TILESET EDITING--------------------- //
    /**
     * Get Pixel Color at given coordinates
     * @param x {number} x-coordinate
     * @param y {number} y-coordinate
     * @returns {{red: *, green: *, blue: *, alpha: *}}
     */
    store.getPixel = (x, y) => {
        const redIndex = y * (store.tileset.tileSize * 4) + x * 4;
        const greenIndex = redIndex + 1;
        const blueIndex = redIndex + 2;
        const alphaIndex = redIndex + 3;
        const tile = store.tilesetImage.tiles[store.currentTileIndex].data;
        return {
            red: tile[redIndex],
            green: tile[greenIndex],
            blue: tile[blueIndex],
            alpha: tile[alphaIndex]
        }
    }

    /**
     * Load Tileset and tileset image
     * @param tilesetId {string} id of tileset to load
     */
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

    /**
     * Set the current color
     * @param color {{red: number, green: number, blue: number}}
     */
    store.setColor = (color) => {
        if(typeof color.red === "string" || typeof color.green === "string" || typeof color.blue === "string") {
            color.red = parseInt(color.red);
            color.green = parseInt(color.green);
            color.blue = parseInt(color.blue);
        }

        color.red = Math.min(color.red, 255);
        color.green = Math.min(color.green, 255);
        color.blue = Math.min(color.blue, 255);

        storeReducer({
            type: EditorActionType.SET_COLOR,
            payload: {
                color: color,
            },
        })
    }

    /**
     * Saves colors in local storage
     */
    store.saveColors = () => localStorage.setItem('colors', JSON.stringify(store.colors));

    /**
     * Loads colors from local storage
     */
    store.loadColors = () => {
        try {
            const colors = JSON.parse(localStorage.getItem('colors'));
            storeReducer({
                type: EditorActionType.LOAD_COLORS,
                payload: {
                    colors: colors,
                },
            })
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Adds a new color to the color palette
     * @param color {{red: number, green: number, blue: number}}
     */
    store.addColor = (color) => {
        storeReducer({
            type: EditorActionType.ADD_COLOR,
            payload: {
                color: color,
            },
        });
    }

    /**
     * Adds a new Tile to the Tileset
     */
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

    /**
     * Edit a pixel in the current tile
     * @param x {number} x-coordinate
     * @param y {number} y-coordinate
     * @param color {{red: number, green: number, blue: number, alpha: number}}
     */
    store.editTile = (x, y, color) => {
        if(x < 0 || y < 0 || x >= store.tileset.tileSize || y >= store.tileset.tileSize) return;

        const newImage = { ...store.tilesetImage };
        const tile = newImage.tiles[store.currentTileIndex].data;

        const c = color || store.currentColor
        const redIndex = y * (store.tileset.tileSize * 4) + x * 4;
        const greenIndex = redIndex + 1;
        const blueIndex = redIndex + 2;
        const alphaIndex = redIndex + 3;

        tile[redIndex] = c.red;
        tile[greenIndex] = c.green;
        tile[blueIndex] = c.blue;
        tile[alphaIndex] = c.alpha;

        storeReducer({
            type: EditorActionType.EDIT_TILE,
            payload: {
                tilesetImage: newImage
            }
        })
    }

    /**
     * Flood fill a tile with a color starting at a given coordinate
     * @param x {number} x-coordinate
     * @param y {number} y-coordinate
     * @param fillColor {{red: number, green: number, blue: number, alpha: number}}
     */
    store.floodFill = (x, y, fillColor) => {
        const newImage = { ...store.tilesetImage };
        const tile = newImage.tiles[store.currentTileIndex].data;
        const color = fillColor || store.currentColor;
        const redIndex = y * (store.tileset.tileSize * 4) + x * 4;
        const greenIndex = redIndex + 1;
        const blueIndex = redIndex + 2;
        const alphaIndex = redIndex + 3;
        const oldRed = tile[redIndex];
        const oldGreen = tile[greenIndex];
        const oldBlue = tile[blueIndex];
        const oldAlpha = tile[alphaIndex];
        const queue = [[x, y]];

        while (queue.length > 0) {
            const [x, y] = queue.pop();
            const redIndex = y * (store.tileset.tileSize * 4) + x * 4;
            const greenIndex = redIndex + 1;
            const blueIndex = redIndex + 2;
            const alphaIndex = redIndex + 3;

            if (tile[redIndex] === oldRed && tile[greenIndex] === oldGreen && tile[blueIndex] === oldBlue && tile[alphaIndex] === oldAlpha) {
                tile[redIndex] = color.red;
                tile[greenIndex] = color.green;
                tile[blueIndex] = color.blue;
                tile[alphaIndex] = color.alpha;

                if (x > 0) {
                    queue.push([x - 1, y]);
                }
                if (x < store.tileset.tileSize - 1) {
                    queue.push([x + 1, y]);
                }
                if (y > 0) {
                    queue.push([x, y - 1]);
                }
                if (y < store.tileset.tileSize - 1) {
                    queue.push([x, y + 1]);
                }
            }
        }

        storeReducer({
            type: EditorActionType.EDIT_TILE,
            payload: {
                tilesetImage: newImage
            }
        })
    }

    /**
     * Select an individual pixel in the current tile
     * @param pixel {{x: number, y: number}}
     */
    store.selectPixel = (pixel) => {
        if(store.selectedPixels.includes(pixel)) return;
        storeReducer({
            type: EditorActionType.SELECT_PIXEL,
            payload: {
                pixel: pixel,
            },
        })
    }

    /**
     * Add a pixel to the selection in the current tile
     * @param pixel {{x: number, y: number}}
     */
    store.addSelectedPixel = (pixel) => {
        if(store.selectedPixels.includes(pixel)) return;
        storeReducer({
            type: EditorActionType.ADD_SELECTED_PIXEL,
            payload: {
                pixel: pixel,
            },
        })
    }

    /**
     * Set the selected pixels in the current tile
     * @param pixels {Array<{x: number, y: number}>}
     */
    store.setSelectedPixels = (pixels) => {
        storeReducer({
            type: EditorActionType.SET_SELECTED_PIXELS,
            payload: {
                pixels: pixels,
            },
        });
    }

    /**
     * Clear all selected pixels in the current tile
     */
    store.clearSelectedPixels = () => {
        for (let i = 0; i < store.selectedPixels.length; i++) {
            const pixel = store.selectedPixels[i];
            store.editTile(pixel.x, pixel.y, {red: 0, green: 0, blue: 0, alpha: 0});
        }
    }

    /**
     * Get vectorized form of the selected pixels
     * @returns {Array} Array of tiles with their relative x and y coordinates and color
     */
    store.getCopyData = () => {
        const minX = Math.min(...store.selectedPixels.map(p => p.x));
        const minY = Math.min(...store.selectedPixels.map(p => p.y));

        const ret = [];
        for (let i = 0; i < store.selectedPixels.length; i++) {
            const {x, y} = store.selectedPixels[i];
            const redIndex = y * (store.tileset.tileSize * 4) + x * 4;
            const greenIndex = redIndex + 1;
            const blueIndex = redIndex + 2;
            const alphaIndex = redIndex + 3;
            const tile = store.tilesetImage.tiles[store.currentTileIndex].data;
            //Subtract by min to find relative position
            ret.push({
                x: x - minX,
                y: y - minY,
                color: {
                    red: tile[redIndex],
                    green: tile[greenIndex],
                    blue: tile[blueIndex],
                    alpha: tile[alphaIndex]
                }
            });
        }
        return ret;
    }

    /**
     * Paste vectorized form of the selected pixels at the top-left most selected pixel
     * @param pixels {Array} Array of tiles with their relative x and y coordinates and color
     */
    store.pasteData = (pixels) => {
        if(store.selectedPixels.length === 0) return;

        const minX = store.selectedPixels[0].x;
        const minY = store.selectedPixels[0].y;

        for (let i = 0; i < pixels.length; i++) {
            const {x, y, color} = pixels[i];
            store.editTile(x + minX, y + minY, color);
        }
    }

    /**
     * Paste pixels at actual coordinates
     * @param pixels {Array} Array of tiles with their x and y coordinates and color
     */
    store.pasteDataActual = (pixels) => {
        for (let i = 0; i < pixels.length; i++) {
            const {x, y, color} = pixels[i];
            store.editTile(x, y, color);
        }
    }

    /**
     * Convert tileset image object to string JSON and upload to S3 Bucket
     */
    store.saveTileset = async () => {
        const stringImage = JSON.stringify(store.tilesetImage);
        const res = await uploadTilesetImage(store.tileset._id, stringImage);

        if (res.status === 200) {
            console.log('Tileset saved');
        } else {
            console.log('Error saving tileset');
        }
    }

    /**
     * Set Tileset to Public or Private
     * @param isPublic {boolean} Whether the tileset is public or not
     */
    store.setTilesetVisiblity = (isPublic) => {
        updateTileset(store.tileset._id, {...store.tileset, public: isPublic}).then(r => {
            if(r.status === 200) {
                store.setTileset(store.tileset._id);
            } else {
                console.log('Error updating tileset visibility');
            }
        }).catch(e => console.log(e));
    }

    /**
     * Set Tileset Title
     * @param title {string} Title of the tileset
     */
    store.changeTilesetTitle = (title) => {
        updateTileset(store.tileset._id, {...store.tileset, title: title}).then(r => {
            if(r.status === 200) {
                store.setTileset(store.tileset._id);
            } else {
                console.log('Error updating tileset title');
            }
        }).catch(e => console.log(e));
    }

    /**
     * Delete Currently Selected Tile
     */
    store.deleteTile = () => {
        if(store.tilesetImage.tiles.length === 1) return;

        const newTiles = store.tilesetImage.tiles.filter((t, i) => i !== store.currentTileIndex);
        const newTilesetImage = {...store.tilesetImage, tiles: newTiles};

        storeReducer({
            type: EditorActionType.DELETE_TILE,
            payload: {
                tilesetImage: newTilesetImage,
            }
        });
    }

    return (
        <EditorContext.Provider
            value={{store}}
        >
            {props.children}
        </EditorContext.Provider>
    )
}

export default EditorContext;
export { EditorContextProvider };