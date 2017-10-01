"use strict";

module.exports = class GetTaskComponentDataResponse {
  constructor(taskId, componentId) {
    this.TaskId = taskId;
    this.ComponentId = componentId;
    this.ComponentData = { };
  }
}
