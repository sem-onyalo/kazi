"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const DeleteDirectoryRequest = require('./delete-directory-request');

describe('DeleteDirectoryRequest', () => {
  it('should define the properties: DirectoryId and set them on init', () => {
    let request = new DeleteDirectoryRequest(1);
    expect(request).to.have.property('DirectoryId');
    assert.strictEqual(request.DirectoryId, 1, 'DirectoryId was not set to expected value');
  });
});
