"use strict";

const Constants = require('../util/constants');
const Entity = require('../entity');
const UpdateUserRequest = require('./model/update-user-request');

const ValidationHelper = require('../util/validation-helper');
module.exports = class UpdateUser {
  constructor(userRepository) {
    this._userRepository = userRepository;
  }

  execute(updateUserRequest) {
    ValidationHelper.stringNotNullOrEmpty(updateUserRequest.FirstName, 'The first name cannot be empty');
    ValidationHelper.stringNotNullOrEmpty(updateUserRequest.LastName, 'The last name cannot be empty');
    ValidationHelper.stringNotNullOrEmpty(updateUserRequest.Username, 'The username cannot be empty');
    if (!ValidationHelper.stringNotNullOrEmpty(updateUserRequest.Password)
      && !ValidationHelper.stringNotNullOrEmpty(updateUserRequest.AuthToken))
      throw 'The password and auth token cannot both be empty';
    ValidationHelper.regexMatch(Constants.REGEX_PASSWORD, updateUserRequest.Password, 'The password must be a minimum of 8 characters and include at least one upper case, one lower case, one numeric, and one special character');
    ValidationHelper.existsInArray([Entity.UserRole.ADMIN, Entity.UserRole.USER], updateUserRequest.UserRole, 'The user role is invalid');

    let user = new Entity.User(updateUserRequest.UserId, updateUserRequest.FirstName, updateUserRequest.LastName, updateUserRequest.Username, updateUserRequest.Password, updateUserRequest.AuthToken, updateUserRequest.UserRole);
    let updatedUser = this._userRepository.update(user);

    if (updatedUser == null) throw 'There was an error updating the user or the user does not exist';
    return updatedUser;
  }
}
