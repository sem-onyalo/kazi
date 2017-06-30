"use strict";

module.exports = class AuthenticateUser {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  execute(authenticateUserRequest) {
    let user = this._userRepository.getByUsernameAndPassword(authenticateUserRequest.Username, authenticateUserRequest.Password);
    return user !== null;
  }
}
