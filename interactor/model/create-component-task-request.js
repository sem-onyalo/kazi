"use strict";

module.exports = class CreateComponentTaskRequest {
  constructor(componentId, taskId) {
    this.ComponentId = componentId;
    this.TaskId = taskId
  }
}
