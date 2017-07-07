"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const SetupAssociationRequest = require('./setup-association-request');

describe('SetupAssociationRequest', () => {
  it('should define the properties: AssociationName, AssociationAlias, DefaultDirectoryName, AdminFirstName, AdminLastName, AdminUsername, AdminPassword and set them on init', () => {
    let request = new SetupAssociationRequest('ABC Inc.', 'Company', 'Inbox', 'John', 'Doe', 'john.doe', 'Password1!');
    expect(request).to.have.property('AssociationName');
    expect(request).to.have.property('AssociationAlias');
    expect(request).to.have.property('DefaultDirectoryName');
    expect(request).to.have.property('AdminFirstName');
    expect(request).to.have.property('AdminLastName');
    expect(request).to.have.property('AdminUsername');
    expect(request).to.have.property('AdminPassword');
    assert.strictEqual(request.AssociationName, 'ABC Inc.', 'AssociationName was not set to expected value');
    assert.strictEqual(request.AssociationAlias, 'Company', 'AssociationAlias was not set to expected value');
    assert.strictEqual(request.DefaultDirectoryName, 'Inbox', 'DefaultDirectoryName was not set to expected value');
    assert.strictEqual(request.AdminFirstName, 'John', 'AdminFirstName was not set to expected value');
    assert.strictEqual(request.AdminLastName, 'Doe', 'AdminLastName was not set to expected value');
    assert.strictEqual(request.AdminUsername, 'john.doe', 'AdminUsername was not set to expected value');
    assert.strictEqual(request.AdminPassword, 'Password1!', 'AdminPassword was not set to expected value');
  });
});
