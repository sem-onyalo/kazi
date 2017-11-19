"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');
require('chai').use(require('chai-as-promised'));

const Datasource = require('../datasource/');
const Entity = require('../entity');
const UpdateUser = require('./update-user');
const UpdateUserRequest = require('./model/update-user-request');

describe('UpdateUser', () => {
  let userRepository;
  let updateUser;
  let request;

  beforeEach(function () {
    userRepository = new Datasource.UserRepository();
    updateUser = new UpdateUser(userRepository);
    request = new UpdateUserRequest(1, 'John', 'Doe', 'john.doe', 'Password1!', 'a1b2c3', Entity.UserRole.USER);
  });

  describe('execute(updateUserRequest)', () => {
    it('should export function', () => {
      expect(updateUser.execute).to.be.a('function');
    });

    it('should throw an exception if the first name is empty', () => {
      let promises = [];
      let data = [null, undefined, ''];
      for (let i = 0; i < data.length; i++) {
        request.FirstName = data[i];
        promises.push(assert.isRejected(updateUser.execute(request), 'The first name cannot be empty'));
      }

      return Promise.all(promises);
    });

    it('should throw an exception if the last name is empty', () => {
      let promises = [];
      let data = [null, undefined, ''];
      for (let i = 0; i < data.length; i++) {
        request.LastName = data[i];
        promises.push(assert.isRejected(updateUser.execute(request), 'The last name cannot be empty'));
      }

      return Promise.all(promises);
    });

    it('should throw an exception if the username is empty', () => {
      let promises = [];
      let data = [null, undefined, ''];
      for (let i = 0; i < data.length; i++) {
        request.Username = data[i];
        promises.push(assert.isRejected(updateUser.execute(request), 'The username cannot be empty'));
      }

      return Promise.all(promises);
    });

    it('should throw an exception if password does not meet strength requirements (at least 8 or more, one upper, one lower, one numeric, and one special character)', () => {
      let promises = [];
      let data = ['123456789', 'abcdefghi', 'ABCDEFGHI', '!@#$%^&*()', 'P@w1'];
      for (var i = 0; i < data.length; i++) {
        request.Password = data[i];
        promises.push(assert.isRejected(updateUser.execute(request), 'The password must be a minimum of 8 characters and include at least one upper case, one lower case, one numeric, and one special character'));
      }

      return Promise.all(promises);
    });

    it('should throw an exception if user role is not expected value', () => {
      let promises = [];
      let data = [0, 1, 4];
      for (var i = 0; i < data.length; i++) {
        request.UserRole = data[i];
        promises.push(assert.isRejected(updateUser.execute(request), 'The user role is invalid'));
      }

      return Promise.all(promises);
    });

    it('should update the user', async () => {
      let request = new UpdateUserRequest(1, 'John', 'Doe', 'jdoe', 'Password1!', '', Entity.UserRole.USER);
      let updatedUser = new Entity.User(1, 'John', 'Doe', 'jdoe', 'Password1!', '', Entity.UserRole.USER);
      let expectedUser = new Entity.User(1, 'John', 'Doe', 'jdoe', 'Password1!', '', Entity.UserRole.USER);
      delete expectedUser.Password;

      let getUserStub = sinon
        .stub(userRepository, 'getByUsername')
        .returns(new Entity.User(1, 'John', 'Doe', 'john.doe', 'Password1!', '', Entity.UserRole.USER));
    
      let updateUserStub = sinon
        .stub(userRepository, 'update')
        .returns(new Entity.User(1, 'John', 'Doe', 'jdoe', 'Password1!', '', Entity.UserRole.USER));

      let actualUser = await updateUser.execute(request);

      sinon.assert.calledOnce(updateUserStub);
      sinon.assert.calledWith(updateUserStub, updatedUser);

      assert.deepEqual(actualUser, expectedUser, 'The returned user was not expected value');
    });

    it('should throw an exception if the user was not updated or the user does not exist', () => {
      let expectedUser = new Entity.User(1, 'John', 'Doe', 'john.doe', 'Password1!', '', Entity.UserRole.USER);

      let getUserStub = sinon
        .stub(userRepository, 'getByUsername')
        .returns(expectedUser);
        
      let updateUserStub = sinon
        .stub(userRepository, 'update')
        .returns(null);

      return assert.isRejected(updateUser.execute(request), 'There was an error updating the user or the user does not exist');
    });

    it('should update the user with an auto-generated token if the password is empty', async () => {
      let expectedAuthTokenLength = 64;
      let expectedUser = new Entity.User(1, 'John', 'Doe', 'john.doe', 'Password1!', '', Entity.UserRole.USER);

      let getUserStub = sinon
        .stub(userRepository, 'getByUsername')
        .returns(expectedUser);

      let updateUserStub = sinon
        .stub(userRepository, 'update')
        .returnsArg(0);

      let data = [null, undefined, ''];
      for (let i = 0; i < data.length; i++) {
        request.Password = data[i];
        let actualUser = await updateUser.execute(request);

        assert.strictEqual(actualUser.AuthToken.length, expectedAuthTokenLength, 'Auth token should have been generated if password is empty');
      }
    });
  });
});
