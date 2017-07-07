"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const CreateAssociation = require('./create-association');
const CreateAssociationRequest = require('./model/create-association-request');

const CreateDirectory = require('./create-directory');
const CreateDirectoryRequest = require('./model/create-directory-request');
const CreateUser = require('./create-user');
const CreateUserRequest = require('./model/create-user-request');
const Datasource = require('../datasource');
const Entity = require('../entity');
const SetupAssociation = require('./setup-association');
const SetupAssociationRequest = require('./model/setup-association-request');
const SetupAssociationResponse = require('./model/setup-association-response');

describe('SetupAssociation', () => {
  let associationRepository;
  let directoryRepository;
  let userRepository;
  let createAssociation;
  let createDirectory;
  let createUser;
  let setupAssociation;

  beforeEach(function () {
    associationRepository = new Datasource.AssociationRepository();
    directoryRepository = new Datasource.DirectoryRepository();
    userRepository = new Datasource.UserRepository();
    createAssociation = new CreateAssociation(associationRepository);
    createDirectory = new CreateDirectory(associationRepository, directoryRepository);
    createUser = new CreateUser(associationRepository, userRepository);
    setupAssociation = new SetupAssociation(createAssociation, createDirectory, createUser);
  });

  describe('execute(setupAssociationRequest)', () => {
    it('should export function ', () => {
      expect(setupAssociation.execute).to.be.a('function');
    });

    it('should create the association, directory then user', () => {
      let associationId = 1;
      let associationAlias = 'Company';
      let associationName = 'My Association';
      let association = new Entity.Association(associationId, 'my-association', associationName, associationAlias);
      let createAssociationRequest = new CreateAssociationRequest(associationName, associationAlias);
      let createAssociationStub = sinon
        .stub(createAssociation, 'execute')
        .returns(association);

      let directoryId = 1;
      let directoryName = 'Inbox';
      let directory = new Entity.Directory(directoryId, associationId, 0, 'inbox', directoryName);
      let createDirectoryRequest = new CreateDirectoryRequest(directoryName, 0, associationId);

      let createDirectoryStub = sinon
        .stub(createDirectory, 'execute')
        .returns(directory);

      let userId = 1;
      let firstName = 'John', lastName = 'Doe', username = 'john.doe', password = 'Password1!', userRole = Entity.UserRole.ADMIN;
      let user = new Entity.User(userId, firstName, lastName, username, password, '', userRole);
      let createUserRequest = new CreateUserRequest(firstName, lastName, username, password, userRole, associationId);

      let createUserStub = sinon
        .stub(createUser, 'execute')
        .returns(user);

      let request = new SetupAssociationRequest(associationName, associationAlias, directoryName, firstName, lastName, username, password);
      let expectedResponse = new SetupAssociationResponse(association, directory, user);

      let response = setupAssociation.execute(request);

      sinon.assert.calledOnce(createAssociationStub);
      sinon.assert.calledWith(createAssociationStub, createAssociationRequest);

      sinon.assert.calledOnce(createDirectoryStub);
      sinon.assert.calledWith(createDirectoryStub, createDirectoryRequest);

      sinon.assert.calledOnce(createUserStub);
      sinon.assert.calledWith(createUserStub, createUserRequest);

      assert.deepEqual(response, expectedResponse, 'The returned response was not the expected value');
    });
  });
});
