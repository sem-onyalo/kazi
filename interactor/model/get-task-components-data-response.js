"use strict";

module.exports = class GetTaskComponentsDataResponse {
  constructor(taskId) {
    this.TaskId = taskId;
    this.ComponentsData = [];
  }
}
