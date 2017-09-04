"use strict";

module.exports = class RegisterUserRequest {
  constructor(username, password, authToken) {
    this.Username = username;
    this.Password = password;
    this.AuthToken = authToken;
  }
}
