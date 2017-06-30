"use strict";

module.exports = class AuthenticateUserRequest {
  constructor(username, password) {
    this.Username = username;
    this.Password = password;
  }
}
