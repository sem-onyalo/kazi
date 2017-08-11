"use strict";

module.exports = class Volunteer {
  constructor(taskId, userId, itemId, itemName, firstName, lastName) {
    this.TaskId = taskId;
    this.UserId = userId;
    this.ItemId = itemId;
    this.ItemName = itemName;
    this.FirstName = firstName;
    this.LastName = lastName;
  }
}
