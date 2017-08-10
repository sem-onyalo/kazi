"use strict";

module.exports = class Attendance {
  constructor(taskId, userId, firstName, lastName, isAttending) {
    this.TaskId = taskId;
    this.UserId = userId;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.IsAttending = isAttending;
  }
}
