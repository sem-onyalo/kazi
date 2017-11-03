"use strict";

module.exports = class Table {
    constructor(id, taskId, name, rows) {
        this.Id = id;
        this.TaskId = taskId;
        this.Name = name;
        this.Rows = rows;
    }
}