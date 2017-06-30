"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const AuthenticateUser = require('./authenticate-user');
const AuthenticateUserRequest = require('./model/authenticate-user-request');
const Entity = require('../entity');
const Datasource = require('../datasource');

describe('AuthenticateUser', () => {
  let authenticateUser;
  let userRepository;

  beforeEach(function () {
    userRepository = new Datasource.UserRepository();
    authenticateUser = new AuthenticateUser(userRepository);
  });

  describe('execute(authenticateUserRequest)', () => {
    it('should export function', () => {
      expect(authenticateUser.execute).to.be.a('function');
    });

    it('should return false if the user does not exist', () => {
      let request = new AuthenticateUserRequest('john.doe', 'password');
      let getUserByUsernameAndPasswordStub = sinon
        .stub(userRepository, 'getByUsernameAndPassword')
        .returns(null);

      let isAuth = authenticateUser.execute(request);

      getUserByUsernameAndPasswordStub.restore();

      sinon.assert.calledOnce(getUserByUsernameAndPasswordStub);
      sinon.assert.calledWith(getUserByUsernameAndPasswordStub, 'john.doe', 'password');
      assert.strictEqual(isAuth, false, 'Authenticate user result should be false');
    });

    it('should return true if the user exists', () => {
      let request = new AuthenticateUserRequest('john.doe', 'mypassword');
      let getUserByUsernameAndPasswordStub = sinon
        .stub(userRepository, 'getByUsernameAndPassword')
        .returns(new Entity.User(1, 'John', 'Doe', 'john.doe', 'mypassword'));

      let isAuth = authenticateUser.execute(request);

      getUserByUsernameAndPasswordStub.restore();

      sinon.assert.calledOnce(getUserByUsernameAndPasswordStub);
      sinon.assert.calledWith(getUserByUsernameAndPasswordStub, 'john.doe', 'mypassword');
      assert.strictEqual(isAuth, true, 'Authenticate user result should be true');
    });
  });
});
