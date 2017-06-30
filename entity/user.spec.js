"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const User = require('./user');

describe('User', () => {
  it('should define the properties: Id, FirstName, LastName, Username, Password, AuthToken and set them on init', () => {
    let user = new User(1, 'john', 'doe', 'john.doe', 'mypassword', 'abc123def456ghi789');
    expect(user).to.have.property('Id');
    expect(user).to.have.property('FirstName');
    expect(user).to.have.property('LastName');
    expect(user).to.have.property('Username');
    expect(user).to.have.property('Password');
    expect(user).to.have.property('AuthToken');
    assert.strictEqual(user.Id, 1, 'Id was not set to expected value');
    assert.strictEqual(user.FirstName, 'john', 'FirstName was not set to expected value');
    assert.strictEqual(user.LastName, 'doe', 'LastName was not set to expected value');
    assert.strictEqual(user.Username, 'john.doe', 'Username was not set to expected value');
    assert.strictEqual(user.Password, 'mypassword', 'Password was not set to expected value');
    assert.strictEqual(user.AuthToken, 'abc123def456ghi789', 'AuthToken was not set to expected value');
  });
});
