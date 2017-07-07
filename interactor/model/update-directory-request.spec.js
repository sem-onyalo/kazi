"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const UpdateDirectoryRequest = require('./update-directory-request');

describe('UpdateDirectoryRequest', () => {
  it('should define the properties: DirectoryId, DirectoryName, ParentId and set them on init', () => {
    let request = new UpdateDirectoryRequest(2, 'Dev Inbox', 1, 1);
    expect(request).to.have.property('DirectoryId');
    expect(request).to.have.property('DirectoryName');
    expect(request).to.have.property('ParentId');
    expect(request).to.have.property('AssociationId');
    assert.strictEqual(request.DirectoryId, 2, 'DirectoryId was not set to expected value');
    assert.strictEqual(request.DirectoryName, 'Dev Inbox', 'DirectoryName was not set to expected value');
    assert.strictEqual(request.ParentId, 1, 'ParentId was not set to expected value');
    assert.strictEqual(request.AssociationId, 1, 'AssociationId was not set to expected value');
  });
});
