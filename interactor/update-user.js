"use strict";

const Constants = require('../util/constants');
const Entity = require('../entity');
const SecurityHelper = require('../util/security-helper');
const UpdateUserRequest = require('./model/update-user-request');
const ValidationHelper = require('../util/validation-helper');

module.exports = class UpdateUser {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  async execute(updateUserRequest) {
    ValidationHelper.stringNotNullOrEmpty(updateUserRequest.FirstName, 'The first name cannot be empty');
    ValidationHelper.stringNotNullOrEmpty(updateUserRequest.LastName, 'The last name cannot be empty');
    ValidationHelper.stringNotNullOrEmpty(updateUserRequest.Username, 'The username cannot be empty');
    ValidationHelper.existsInArray([Entity.UserRole.ADMIN, Entity.UserRole.USER], updateUserRequest.UserRole, 'The user role is invalid');

    if (ValidationHelper.stringNotNullOrEmpty(updateUserRequest.Password)) {
      ValidationHelper.regexMatch(Constants.REGEX_PASSWORD, updateUserRequest.Password, 'The password must be a minimum of 8 characters and include at least one upper case, one lower case, one numeric, and one special character');
    }

    let authToken = '';
    if (!ValidationHelper.stringNotNullOrEmpty(updateUserRequest.Password)) {
      authToken = SecurityHelper.generateRandomString(Constants.USER_AUTH_TOKEN_LENGTH);
    }

    let user = await this._userRepository.getByUsername(updateUserRequest.Username);
    if (user !== null && user.Id !== updateUserRequest.UserId && user.Username === updateUserRequest.Username) throw 'A user with that username already exists';

    user = new Entity.User(updateUserRequest.UserId, updateUserRequest.FirstName, updateUserRequest.LastName, updateUserRequest.Username, updateUserRequest.Password, authToken, updateUserRequest.UserRole);
    let updatedUser = await this._userRepository.update(user);

    if (updatedUser == null) throw 'There was an error updating the user or the user does not exist';
    return updatedUser;
  }
}
