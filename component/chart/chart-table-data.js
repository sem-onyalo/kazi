"use strict";

module.exports = class ChartTableData {
    constructor (taskId, taskName, value, rowId, rowOrder, rowName, colId, colOrder, colName, xAxisColNum, yAxisColNum, xAxisName, yAxisName, chartColor, chartAlias) {
        this.TaskId = taskId;
        this.TaskName = taskName;
        this.Value = value;
        this.RowId = rowId;
        this.RowOrder = rowOrder;
        this.RowName = rowName;
        this.ColId = colId;
        this.ColOrder = colOrder;
        this.ColName = colName;
        this.XAxisColNum = xAxisColNum;
        this.YAxisColNum = yAxisColNum;
        this.XAxisName = xAxisName;
        this.YAxisName = yAxisName;
        this.ChartColor = chartColor;
        this.ChartAlias = chartAlias;
    }
}