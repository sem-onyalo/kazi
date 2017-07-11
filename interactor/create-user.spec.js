"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const CreateUser = require('./create-user');
const CreateUserRequest = require('./model/create-user-request');
const Datasource = require('../datasource');
const Entity = require('../entity');

describe('CreateUser', () => {
  let request;

  let associationRepository;
  let userRepository;
  let createUser;

  beforeEach(function () {
    associationRepository = new Datasource.AssociationRepository();
    userRepository = new Datasource.UserRepository();
    createUser = new CreateUser(associationRepository, userRepository);

    request = new CreateUserRequest('John', 'Doe', 'john.doe', 'Password1!', 'a1b2c3', Entity.UserRole.USER, 1);
  });

  describe('execute(createUserRequest)', () => {
    it('should export function', () => {
      expect(createUser.execute).to.be.a('function');
    });

    it('should throw an exception if the first name is empty', () => {
      request.FirstName = null;
      let createUserFn = function () { createUser.execute(request); };
      expect(createUserFn).to.throw('The first name cannot be empty');

      request.FirstName = undefined;
      createUserFn = function () { createUser.execute(request); };
      expect(createUserFn).to.throw('The first name cannot be empty');

      request.FirstName = '';
      createUserFn = function () { createUser.execute(request); };
      expect(createUserFn).to.throw('The first name cannot be empty');
    });

    it('should throw an exception if the last name is empty', () => {
      request.LastName = null;
      let createUserFn = function () { createUser.execute(request); };
      expect(createUserFn).to.throw('The last name cannot be empty');

      request.LastName = undefined;
      createUserFn = function () { createUser.execute(request); };
      expect(createUserFn).to.throw('The last name cannot be empty');

      request.LastName = '';
      createUserFn = function () { createUser.execute(request); };
      expect(createUserFn).to.throw('The last name cannot be empty');
    });

    it('should throw an exception if the username is empty', () => {
      request.Username = null;
      let createUserFn = function () { createUser.execute(request); };
      expect(createUserFn).to.throw('The username cannot be empty');

      request.Username = undefined;
      createUserFn = function () { createUser.execute(request); };
      expect(createUserFn).to.throw('The username cannot be empty');

      request.Username = '';
      createUserFn = function () { createUser.execute(request); };
      expect(createUserFn).to.throw('The username cannot be empty');
    });

    it('should throw an exception if password is not empty and does not meet strength requirements (at least 8 or more, one upper, one lower, one numeric, and one special character)', () => {
      let data = ['123456789', 'abcdefghi', 'ABCDEFGHI', '!@#$%^&*()', 'P@w1'];
      for (var i = 0; i < data.length; i++) {
        request.Password = data[i];
        let createUserFn = function () { createUser.execute(request); };
        expect(createUserFn).to.throw('The password must be a minimum of 8 characters and include at least one upper case, one lower case, one numeric, and one special character');
      }
    });

    it('should throw an exception if user role is not expected value', () => {
      let data = [0, 1, 4];
      for (var i = 0; i < data.length; i++) {
        request.UserRole = data[i];
        let createUserFn = function () { createUser.execute(request); };
        expect(createUserFn).to.throw('The user role is invalid');
      }
    });

    it('should throw an exception if the association does not exist', () => {
      let getAssociationByIdStub = sinon
        .stub(associationRepository, 'getById')
        .returns(null);

      let createUserFn = function () { createUser.execute(request); };
      expect(createUserFn).to.throw('The specified association does not exist');

      getAssociationByIdStub.restore();

      sinon.assert.calledOnce(getAssociationByIdStub);
      sinon.assert.calledWith(getAssociationByIdStub, request.AssociationId);
    });

    it('should create the user', () => {
      let expectedUser = new Entity.User(1, 'John', 'Doe', 'john.doe', 'Password1!', '', Entity.UserRole.USER);
      let expectedNewUser = new Entity.User(0, 'John', 'Doe', 'john.doe', 'Password1!', '', Entity.UserRole.USER);

      let getAssociationByIdStub = sinon
        .stub(associationRepository, 'getById')
        .returns(new Entity.Association(1, 'my-association', 'My Association', 'Company'));

      let createUserStub = sinon
        .stub(userRepository, 'create')
        .returns(expectedUser);

      let actualUser = createUser.execute(request);

      getAssociationByIdStub.restore();
      createUserStub.restore();

      sinon.assert.calledOnce(getAssociationByIdStub);
      sinon.assert.calledWith(getAssociationByIdStub, request.AssociationId);

      sinon.assert.calledOnce(createUserStub);
      sinon.assert.calledWith(createUserStub, expectedNewUser);

      assert.deepEqual(actualUser, expectedUser, 'Returned user object was not expected value');
    });

    it('should create the user with an auto-generated auth token if the password is empty', () => {
      let expectedAuthTokenLength = 64;

      let getAssociationByIdStub = sinon
        .stub(associationRepository, 'getById')
        .returns(new Entity.Association(1, 'my-association', 'My Association', 'Company'));

      let createUserStub = sinon
        .stub(userRepository, 'create')
        .returnsArg(0);

      let data = [null, undefined, ''];
      for (let i = 0; i < data.length; i++) {
        request.Password = data[i];
        let actualUser = createUser.execute(request);

        assert.strictEqual(actualUser.AuthToken.length, expectedAuthTokenLength, 'Auth token should have been generated if password is empty');
      }

      createUserStub.restore();
    });
  });
});
