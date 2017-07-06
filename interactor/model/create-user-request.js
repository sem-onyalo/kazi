"use strict";

module.exports = class CreateUserRequest {
  constructor(firstName, lastName, username, password, userRole, associationId) {
    this.FirstName = firstName;
    this.LastName = lastName;
    this.Username = username;
    this.Password = password;
    this.UserRole = userRole;
    this.AssociationId = associationId;
  }
}
