"use strict";

module.exports = class AuthenticateUser {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  async execute(authenticateUserRequest) {
    let user = await this._userRepository.getByUsernameAndPassword(authenticateUserRequest.Username, authenticateUserRequest.Password);
    if (user) delete user.Password;
    return user;
    // return user !== null;
  }
}
