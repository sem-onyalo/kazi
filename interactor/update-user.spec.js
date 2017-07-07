"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

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
      let data = [null, undefined, ''];
      for (let i = 0; i < data.length; i++) {
        request.FirstName = data[i];
        let updateUserFn = function () { updateUser.execute(request); };
        expect(updateUserFn).to.throw('The first name cannot be empty');
      }
    });

    it('should throw an exception if the last name is empty', () => {
      let data = [null, undefined, ''];
      for (let i = 0; i < data.length; i++) {
        request.LastName = data[i];
        let updateUserFn = function () { updateUser.execute(request); };
        expect(updateUserFn).to.throw('The last name cannot be empty');
      }
    });

    it('should throw an exception if the username is empty', () => {
      let data = [null, undefined, ''];
      for (let i = 0; i < data.length; i++) {
        request.Username = data[i];
        let updateUserFn = function () { updateUser.execute(request); };
        expect(updateUserFn).to.throw('The username cannot be empty');
      }
    });

    it('should throw an exception if both password and auth token are empty', () => {
      let data = [null, undefined, ''];
      for (let i = 0; i < data.length; i++) {
        request.Password = data[i];
        request.AuthToken = data[i];
        let updateUserFn = function () { updateUser.execute(request); };
        expect(updateUserFn).to.throw('The password and auth token cannot both be empty');
      }
    });

    it('should throw an exception if password does not meet strength requirements (at least 8 or more, one upper, one lower, one numeric, and one special character)', () => {
      let data = ['123456789', 'abcdefghi', 'ABCDEFGHI', '!@#$%^&*()', 'P@w1'];
      for (var i = 0; i < data.length; i++) {
        request.Password = data[i];
        let updateUserFn = function () { updateUser.execute(request); };
        expect(updateUserFn).to.throw('The password must be a minimum of 8 characters and include at least one upper case, one lower case, one numeric, and one special character');
      }
    });

    it('should throw an exception if user role is not expected value', () => {
      let data = [0, 1, 4];
      for (var i = 0; i < data.length; i++) {
        request.UserRole = data[i];
        let updateUserFn = function () { updateUser.execute(request); };
        expect(updateUserFn).to.throw('The user role is invalid');
      }
    });

    it('should update the user', () => {
      let expectedUser = new Entity.User(1, 'John', 'Doe', 'john.doe', 'Password1!', 'a1b2c3', Entity.UserRole.USER);
      let updateUserStub = sinon
        .stub(userRepository, 'update')
        .returns(expectedUser);

      expectedUser.Username = 'jdoe';
      request.Username = 'jdoe';
      let actualUser = updateUser.execute(request);

      updateUserStub.restore();

      sinon.assert.calledOnce(updateUserStub);
      sinon.assert.calledWith(updateUserStub, expectedUser);
      assert.deepEqual(actualUser, expectedUser, 'The returned user was not expected value');
    });

    it('should throw an exception if the user was not updated or the user does not exist', () => {
      let updateUserStub = sinon
        .stub(userRepository, 'update')
        .returns(null);

      let updateUserFn = function () { updateUser.execute(request); };
      expect(updateUserFn).to.throw('There was an error updating the user or the user does not exist');
    });
  });
});
