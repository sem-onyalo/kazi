"use strict";

const Constants = require('../util/constants');
const Entity = require('../entity');
const SecurityHelper = require('../util/security-helper');
const ValidationHelper = require('../util/validation-helper');

module.exports = class CreateUser {
  constructor(associationRepository, userRepository) {
    this._associationRepository = associationRepository;
    this._userRepository = userRepository;
  }

  execute(createUserRequest) {
    ValidationHelper.stringNotNullOrEmpty(createUserRequest.FirstName, 'The first name cannot be empty');
    ValidationHelper.stringNotNullOrEmpty(createUserRequest.LastName, 'The last name cannot be empty');
    ValidationHelper.stringNotNullOrEmpty(createUserRequest.Username, 'The username cannot be empty');
    ValidationHelper.existsInArray([Entity.UserRole.ADMIN, Entity.UserRole.USER], createUserRequest.UserRole, 'The user role is invalid');

    if (ValidationHelper.stringNotNullOrEmpty(createUserRequest.Password)) {
      ValidationHelper.regexMatch(Constants.REGEX_PASSWORD, createUserRequest.Password, 'The password must be a minimum of 8 characters and include at least one upper case, one lower case, one numeric, and one special character');
    }

    let association = this._associationRepository.getById(createUserRequest.AssociationId);
    if (association == null) throw 'The specified association does not exist';

    let authToken = '';
    if (!ValidationHelper.stringNotNullOrEmpty(createUserRequest.Password)) {
      authToken = SecurityHelper.generateRandomString(Constants.USER_AUTH_TOKEN_LENGTH);
    }

    let user = new Entity.User(0, createUserRequest.FirstName, createUserRequest.LastName, createUserRequest.Username, createUserRequest.Password, authToken, createUserRequest.UserRole);
    return this._userRepository.create(user);
  }
}