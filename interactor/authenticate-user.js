"use strict";

module.exports = class AuthenticateUser {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  async execute(authenticateUserRequest) {
    return await this._userRepository.getByUsernameAndPassword(authenticateUserRequest.Username, authenticateUserRequest.Password);
    // return user !== null;
  }
}
