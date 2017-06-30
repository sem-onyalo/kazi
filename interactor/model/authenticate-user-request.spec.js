"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const AuthenticateUserRequest = require('./authenticate-user-request');

describe('AuthenticateUserRequest', () => {
  it('should define the properties: Username, Password and set them on init', () => {
    let request = new AuthenticateUserRequest('john.doe', 'mypassword');
    expect(request).to.have.property('Username');
    expect(request).to.have.property('Password');
    assert.strictEqual(request.Username, 'john.doe', 'Username was not set to expected value');
    assert.strictEqual(request.Password, 'mypassword', 'Password was not set to expected value');
  });
});
