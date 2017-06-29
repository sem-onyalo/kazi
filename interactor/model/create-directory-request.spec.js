"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const CreateDirectoryRequest = require('./create-directory-request');

describe('CreateDirectoryRequest', () => {
  it('should define the properties: Name, ParentId, AssociationId and set them on init', () => {
    let request = new CreateDirectoryRequest('My Directory', 16, 8);
    expect(request).to.have.property('Name');
    expect(request).to.have.property('ParentId');
    expect(request).to.have.property('AssociationId');
    assert.strictEqual(request.Name, 'My Directory', 'Name was not set to expected value');
    assert.strictEqual(request.ParentId, 16, 'Alias was not set to expected value');
    assert.strictEqual(request.AssociationId, 8, 'Alias was not set to expected value');
  });
});
