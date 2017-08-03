"use strict";

module.exports = class Attendance {
  constructor(userId, firstName, lastName, isAttending) {
    this.UserId = userId;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.IsAttending = isAttending;
  }
}
