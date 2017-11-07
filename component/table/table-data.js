"use strict";

module.exports = class TableData {
    constructor(rowId, colId, value) {
        this.RowId = rowId;
        this.ColId = colId;
        this.Value = value;
    }
}