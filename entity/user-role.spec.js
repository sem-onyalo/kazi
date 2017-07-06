"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const UserRole = require('./user-role');

describe('UserRole', () => {
  it('should define the constants: SUPER_ADMIN = 1, ADMIN = 2, USER = 3', () => {
    expect(UserRole).to.have.property('SUPER_ADMIN');
    expect(UserRole).to.have.property('ADMIN');
    expect(UserRole).to.have.property('USER');
    assert.strictEqual(UserRole.SUPER_ADMIN, 1, 'SUPER_ADMIN not expected value');
    assert.strictEqual(UserRole.ADMIN, 2, 'ADMIN not expected value');
    assert.strictEqual(UserRole.USER, 3, 'USER not expected value');
  });
});
