"use strict";

module.exports = class UpdateTaskRequest {
  constructor(taskId, taskName) {
    this.TaskId = taskId;
    this.TaskName = taskName;
  }
}
