let mapHeight;
let mapWidth;
let tileSize;
let canvasWidth;
let canvasHeight;
let canvas;

onmessage = (e) => {
    const {type, data} = e.data;

    let ret = "SUCCESS";
    switch (type) {
        case "INIT":
            mapHeight = data.mapHeight;
            mapWidth = data.mapWidth;
            tileSize = data.tileSize;
            canvasWidth = data.canvasWidth;
            canvasHeight = data.canvasHeight;

            canvas = data.canvas;

            ret = "INIT SUCCESS";
            break;

        case 'drawMap':
            drawMap(data);
            ret = "drawMap SUCCESS";
            break;

        case 'redrawCoordinate':
            redrawCoordinate(data);
            ret = "redrawCoordinate SUCCESS";
            break;

        default:
            console.log("unknown message type");
            ret = "UNKNOWN: " + type;
            break;
    }

    postMessage({message: ret});
}

const drawMap = ({layers, tiles, cameraZoom}) => {
    const start = performance.now();

    // number of tiles that can fix in the canvas
    const tilesPerRow = Math.floor(canvasWidth / tileSize);
    const tilesPerColumn = Math.floor(canvasHeight / tileSize);

    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvasWidth, canvasHeight);
    //context.translate(canvasWidth / 2, canvasHeight / 2);
    //console.log(cameraZoom);
    //context.scale(cameraZoom, cameraZoom);


    for(let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        if(!layer.visible) continue;
        for(let j = 0; j < mapHeight; j++) {
            for(let i = 0; i < mapWidth; i++) {
                const index = j * mapWidth + i;
                const tileIndex = layer.data[index];
                if(tileIndex === -1) continue;
                const tile = tiles[tileIndex];
                const colorData = new Uint8ClampedArray(Object.values(tile.data));
                for(let y = 0; y < tileSize; y++) {
                    for(let x = 0; x < tileSize; x++) {
                        const index = (y * tileSize + x) * 4;
                        context.fillStyle = `rgba(${colorData[index]}, ${colorData[index+1]}, ${colorData[index+2]}, ${colorData[index+3]})`;
                        context.fillRect(x + (i * tileSize), y + (j * tileSize), 1, 1);
                    }
                }
            }
        }
    }

    const end = performance.now();
    console.log("redraw took " + (end - start) + " ms");
}

const redrawCoordinate = ({x: i,y: j, currentLayer, tiles}) => {
    const start = performance.now();

    const context = canvas.getContext('2d');
    const layer = currentLayer;
    const index = j * mapWidth + i;
    const tileIndex = layer.data[index];
    context.clearRect(i*tileSize, j*tileSize, tileSize, tileSize);
    if(tileIndex === -1) return;
    const tile = tiles[tileIndex];
    const colorData = new Uint8ClampedArray(Object.values(tile.data));
    for(let y = 0; y < tileSize; y++) {
        for(let x = 0; x < tileSize; x++) {
            const index = (y * tileSize + x) * 4;
            context.fillStyle = `rgba(${colorData[index]}, ${colorData[index+1]}, ${colorData[index+2]}, ${colorData[index+3]})`;
            context.fillRect(x + (i * tileSize), y + (j * tileSize), 1, 1);
        }
    }

    const end = performance.now();
    console.log("redrawCoord took " + (end - start) + " ms");
}