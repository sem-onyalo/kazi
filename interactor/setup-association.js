"use strict";

const CreateAssociationRequest = require('./model/create-association-request');
const SetupAssociationResponse = require('./model/setup-association-response');
const CreateDirectoryRequest = require('./model/create-directory-request');
const CreateUserRequest = require('./model/create-user-request');
const Entity = require('../entity');

module.exports = class SetupAssociation {
  constructor(createAssociation, createDirectory, createUser) {
    this._createAssociation = createAssociation;
    this._createDirectory = createDirectory;
    this._createUser = createUser;
  }

  execute(setupAssociationRequest) {
    let createAssociationRequest = new CreateAssociationRequest(setupAssociationRequest.AssociationName, setupAssociationRequest.AssociationAlias);
    let association = this._createAssociation.execute(createAssociationRequest);

    let createDirectoryRequest = new CreateDirectoryRequest(setupAssociationRequest.DefaultDirectoryName, 0, association.Id);
    let directory = this._createDirectory.execute(createDirectoryRequest);

    let createUserRequest = new CreateUserRequest(setupAssociationRequest.AdminFirstName, setupAssociationRequest.AdminLastName, setupAssociationRequest.AdminUsername, setupAssociationRequest.AdminPassword, Entity.UserRole.ADMIN, association.Id);
    let user = this._createUser.execute(createUserRequest);

    return new SetupAssociationResponse(association, directory, user);
  }
}
