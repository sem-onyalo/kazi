"use strict";

module.exports = class GetTaskComponentsDataRequest {
  constructor(taskId, displayType) {
    this.TaskId = taskId;
    this.DisplayType = displayType;
  }
}
