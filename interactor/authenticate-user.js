"use strict";

const SecurityHelper = require('../util/security-helper');

module.exports = class AuthenticateUser {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  async execute(authenticateUserRequest) {
    let user = await this._userRepository.getByUsername(authenticateUserRequest.Username);

    if (user) {
      let isValid = await SecurityHelper.comparePassword(authenticateUserRequest.Password, user.Password);
      if (isValid) {
        delete user.Password;
      } else {
        user = undefined;
      }
    }
    
    return user;
  }
}
