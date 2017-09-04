"use strict";

const SecurityHelper = require('../util/security-helper');

module.exports = class RegisterUser {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  async execute(registerUserRequest) {
    let user = await this._userRepository.getByUsernameAndAuthToken(registerUserRequest.Username, registerUserRequest.AuthToken);
    if (user) {
      user.Password = await SecurityHelper.hashPassword(registerUserRequest.Password);
      user.AuthToken = '';
      user = await this._userRepository.update(user);
      delete user.Password;
    } else {
      user = undefined;
    }

    return user;
  }
}
