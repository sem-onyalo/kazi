"use strict";

module.exports = class PostTaskComponentDataResponse {
  constructor(taskId, componentId, data) {
    this.TaskId = taskId;
    this.ComponentId = componentId;
    this.Data = data;
  }
}
