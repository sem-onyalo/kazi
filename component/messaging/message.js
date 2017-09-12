"use strict";

module.exports = class Message {
  constructor(id, taskId, userId, message, firstName, lastName) {
    this.Id = id;
    this.TaskId = taskId;
    this.UserId = userId;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Message = message;
  }
}
