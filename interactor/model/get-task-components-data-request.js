"use strict";

module.exports = class GetTaskComponentsDataRequest {
  constructor(taskId, queryParams) {
    this.TaskId = taskId;
    this.QueryParams = queryParams;
  }
}
