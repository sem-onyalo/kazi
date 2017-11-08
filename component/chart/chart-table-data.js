"use strict";

module.exports = class ChartTableData {
    constructor (taskId, value, rowId, rowName, colId, colName) {
        this.TaskId = taskId;
        this.Value = value;
        this.RowId = rowId;
        this.RowName = rowName;
        this.ColId = colId;
        this.ColName = colName;
    }
}