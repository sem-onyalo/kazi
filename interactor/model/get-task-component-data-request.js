"use strict";

module.exports = class GetTaskComponentDataRequest {
  constructor(taskId, componentId, queryParams) {
    this.TaskId = taskId;
    this.ComponentId = componentId;
    this.QueryParams = queryParams;
  }
}
