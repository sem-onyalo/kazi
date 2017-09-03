"use strict";

module.exports = class Feedback {
  constructor(directoryId, title, details, userId, firstName, lastName) {
    this.DirectoryId = directoryId;
    this.Title = title;
    this.Details = details;
    this.UserId = userId;
    this.Firstname = firstName;
    this.LastName = lastName;
  }
}
