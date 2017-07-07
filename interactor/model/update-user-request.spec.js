"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const Entity = require('../../entity');
const UpdateUserRequest = require('./update-user-request');

describe('UpdateUserRequest', () => {
  it('should define the properties: UserId, FirstName, LastName, Username, Password, AuthToken, UserRole and set them on init', () => {
    let request = new UpdateUserRequest(1, 'John', 'Doe', 'john.doe', 'Password1!', 'a1b2c3', Entity.UserRole.USER);
    expect(request).to.have.property('UserId');
    expect(request).to.have.property('FirstName');
    expect(request).to.have.property('LastName');
    expect(request).to.have.property('Username');
    expect(request).to.have.property('Password');
    expect(request).to.have.property('AuthToken');
    expect(request).to.have.property('UserRole');
    assert.strictEqual(request.UserId, 1, 'UserId was not set to expected value');
    assert.strictEqual(request.FirstName, 'John', 'FirstName was not set to expected value');
    assert.strictEqual(request.LastName, 'Doe', 'Lastname was not set to expected value');
    assert.strictEqual(request.Username, 'john.doe', 'Username was not set to expected value');
    assert.strictEqual(request.Password, 'Password1!', 'Password was not set to expected value');
    assert.strictEqual(request.AuthToken, 'a1b2c3', 'AuthToken was not set to expected value');
    assert.strictEqual(request.UserRole, Entity.UserRole.USER, 'UserRole was not set to expected value');
  });
});
