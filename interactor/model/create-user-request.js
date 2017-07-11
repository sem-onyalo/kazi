"use strict";

module.exports = class CreateUserRequest {
  constructor(firstName, lastName, username, password, authToken, userRole, associationId) {
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Username = username;
    this.Password = password;
    this.AuthToken = authToken;
    this.UserRole = userRole;
    this.AssociationId = associationId;
  }
}
