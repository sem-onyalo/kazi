"use strict";

module.exports = class TableRow {
    constructor(id, cells, order, name) {
        this.Id = id;
        this.Cells = cells;
        this.Order = order;
        this.Name = name;
    }
}