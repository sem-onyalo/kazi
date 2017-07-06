"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const CreateUserRequest = require('./create-user-request');
const Entity = require('../../entity');

describe('CreateUserRequest', () => {
  it('should define the properties: FirstName, LastName, Username, Password, UserRole, AssociationId and set them on init', () => {
    let request = new CreateUserRequest('John', 'Doe', 'john.doe', 'a1b2c3', Entity.UserRole.USER, 1);
    expect(request).to.have.property('FirstName');
    expect(request).to.have.property('LastName');
    expect(request).to.have.property('Username');
    expect(request).to.have.property('Password');
    expect(request).to.have.property('UserRole');
    expect(request).to.have.property('AssociationId');
    assert.strictEqual(request.FirstName, 'John', 'FirstName was not set to expected value');
    assert.strictEqual(request.LastName, 'Doe', 'Lastname was not set to expected value');
    assert.strictEqual(request.Username, 'john.doe', 'Username was not set to expected value');
    assert.strictEqual(request.Password, 'a1b2c3', 'Password was not set to expected value');
    assert.strictEqual(request.UserRole, Entity.UserRole.USER, 'UserRole was not set to expected value');
    assert.strictEqual(request.AssociationId, 1, 'AssociationId as not set to expected value');
  });
});
