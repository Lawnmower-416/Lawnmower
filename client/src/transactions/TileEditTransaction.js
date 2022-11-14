import Transaction from "./Transaction";
import {useContext} from "react";
import EditorContext from "../editor";

export default class TileEditTransaction extends Transaction {


    constructor(oldColor, newColor, x, y, tileIndex, editFunction) {
        super();

        this.oldColor = oldColor;
        this.newColor = newColor;
        this.x = x;
        this.y = y;
        this.tileIndex = tileIndex;
        this.editFunction = editFunction;
    }
    doTransaction() {
        this.editFunction(this.tileIndex, this.x, this.y, this.newColor);
    }
    undoTransaction() {
        this.editFunction(this.tileIndex, this.x, this.y, this.oldColor);
    }
}