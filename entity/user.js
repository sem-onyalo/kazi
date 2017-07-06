"use strict";

module.exports = class User {
  constructor(id, firstName, lastName, username, password, authToken, userRole) {
    this.Id = id;
    this.FirstName = firstName;
    this.LastName  = lastName;
    this.Username = username;
    this.Password = password;
    this.AuthToken = authToken;
    this.UserRole = userRole;
  }
}
