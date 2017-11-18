"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');
require('chai').use(require('chai-as-promised'));

const AuthenticateUser = require('./authenticate-user');
const AuthenticateUserRequest = require('./model/authenticate-user-request');
const Entity = require('../entity');
const Datasource = require('../datasource');
const SecurityHelper = require('../util/security-helper');

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

    it('should return undefined if the user does not exist', async () => {
      let request = new AuthenticateUserRequest('john.doe', 'password');

      let getByUsernameStub = sinon
        .stub(userRepository, 'getByUsername')
        .returns(Promise.resolve(undefined));

      let user = await authenticateUser.execute(request);

      getByUsernameStub.restore();

      sinon.assert.calledOnce(getByUsernameStub);
      sinon.assert.calledWith(getByUsernameStub, 'john.doe');
      assert.strictEqual(user, undefined, 'Returned object should be undefined');
    });

    it('should return undefined if the user exists and the passwords do not match', async () => {
      let user = new Entity.User(1, 'John', 'Doe', 'john.doe', 'mypassword');
      let request = new AuthenticateUserRequest('john.doe', 'password');

      let getByUsernameStub = sinon
        .stub(userRepository, 'getByUsername')
        .returns(Promise.resolve(user));

      let comparePasswordStub = sinon
        .stub(SecurityHelper, 'comparePassword')
        .returns(Promise.resolve(false));

      let actualUser = await authenticateUser.execute(request);

      getByUsernameStub.restore();
      comparePasswordStub.restore();

      sinon.assert.calledOnce(getByUsernameStub);
      sinon.assert.calledWith(getByUsernameStub, 'john.doe');
      sinon.assert.calledOnce(comparePasswordStub);
      sinon.assert.calledWith(comparePasswordStub, 'password', 'mypassword');
      assert.strictEqual(actualUser, undefined, 'Returned object should be undefined');
    });

    it('should return user object if the user exists and passwords match', async () => {
      let user = new Entity.User(1, 'John', 'Doe', 'john.doe', 'mypassword');
      let request = new AuthenticateUserRequest('john.doe', 'mypassword');

      let getByUsernameStub = sinon
        .stub(userRepository, 'getByUsername')
        .returns(Promise.resolve(user));

      let comparePasswordStub = sinon
        .stub(SecurityHelper, 'comparePassword')
        .returns(Promise.resolve(true));

      let actualUser = await authenticateUser.execute(request);

      getByUsernameStub.restore();
      comparePasswordStub.restore();
      
      sinon.assert.calledOnce(getByUsernameStub);
      sinon.assert.calledWith(getByUsernameStub, 'john.doe');
      sinon.assert.calledOnce(comparePasswordStub);
      sinon.assert.calledWith(comparePasswordStub, 'mypassword', 'mypassword');
      assert.strictEqual(actualUser, user, 'Authenticated user should return user object');
    });
  });
});
