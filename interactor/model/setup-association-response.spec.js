"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const Entity = require('../../entity');
const SetupAssociationResponse = require('./setup-association-response');

describe('SetupAssociationResponse', () => {
  it('should define the properties and set them on init', () => {
    let association = new Entity.Association(1, 'my-association', 'My Association', 'Company');
    let directory = new Entity.Directory(1, 1, 0, 'inbox', 'Inbox');
    let user = new Entity.User(1, 'john', 'doe', 'john.doe', 'Password1!', '', Entity.UserRole.USER);

    let response = new SetupAssociationResponse(association, directory, user);
    expect(response).to.have.property('Association');
    expect(response).to.have.property('Directory');
    expect(response).to.have.property('User');
    assert.deepEqual(response.Association, association, 'Association was not set to expected value');
    assert.deepEqual(response.Directory, directory, 'Directory was not set to expected value');
    assert.deepEqual(response.User, user, 'User was not set to expected value');
  });
});
