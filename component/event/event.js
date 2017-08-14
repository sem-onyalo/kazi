"use strict";

module.exports = class Event {
  constructor(taskId, eventDate, eventTime) {
    this.TaskId = taskId;
    this.EventDate = eventDate;
    this.EventTime = eventTime;
  }
}
