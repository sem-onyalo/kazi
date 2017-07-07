"use strict";

module.exports = class UpdateUserRequest {
  constructor(userId, firstName, lastName, username, password, authToken, userRole) {
    this.UserId = userId;
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Username = username;
    this.Password = password;
    this.AuthToken = authToken;
    this.UserRole = userRole;
  }
}
