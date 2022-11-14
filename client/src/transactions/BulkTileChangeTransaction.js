import {jsTPS_Transaction} from "./jsTPS";

export default class BulkTileChangeTransaction extends jsTPS_Transaction {
    constructor(oldRegion, newRegion, bulkModify) {
        super();
        this.oldRegion = oldRegion;
        this.newRegion = newRegion;
        this.bulkModify = bulkModify;
    }

    doTransaction() {
        this.bulkModify(this.newRegion);
    }

    undoTransaction() {
        this.bulkModify(this.oldRegion);
    }


}