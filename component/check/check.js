"use strict";

module.exports = class Check {
  constructor(taskId, userId, firstName, lastName, isChecked) {
    this.TaskId = taskId;
    this.UserId = userId;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.IsChecked = isChecked;
  }
}
