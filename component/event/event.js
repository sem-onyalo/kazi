"use strict";

module.exports = class Event {
  constructor(taskId, eventDate, eventTime) {
    this.TaskId = taskId;
    this.EventDate = eventDate.toISOString().substring(0, 10);
    this.EventTime = eventTime;
  }
}
