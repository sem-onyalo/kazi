"use strict";

module.exports = class Event {
  constructor(id, taskId, eventDateTime) {
    this.Id = id;
    this.TaskId = taskId;
    this.EventDateTime = eventDateTime;
  }
}
