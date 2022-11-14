import {jsTPS_Transaction} from "./jsTPS";

export default class TileEditTransaction extends jsTPS_Transaction {

    constructor(oldColor, newColor, x, y, editFunction) {
        super();

        this.oldColor = oldColor;
        this.newColor = newColor;
        this.x = x;
        this.y = y;
        this.editFunction = editFunction;
    }
    doTransaction() {
        this.editFunction(this.x, this.y, this.newColor);
    }
    undoTransaction() {
        this.editFunction(this.x, this.y, this.oldColor);
    }
}