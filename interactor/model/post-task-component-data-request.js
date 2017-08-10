"use strict";

module.exports = class PostTaskComponentDataRequest {
  constructor(taskId, componentId, displayType, data) {
    this.TaskId = taskId;
    this.ComponentId = componentId;
    this.DisplayType = displayType;
    this.Data = data;
  }
}
