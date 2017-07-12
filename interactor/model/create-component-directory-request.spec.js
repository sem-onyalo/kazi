"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const CreateComponentDirectoryRequest = require('./create-component-directory-request');

describe('CreateComponentDirectoryRequest', () => {
  it('should define the properties: ComponentId, DirectoryId and set them on init', () => {
    let request = new CreateComponentDirectoryRequest(1, 2);
    expect(request).to.have.property('ComponentId');
    expect(request).to.have.property('DirectoryId');
    assert.strictEqual(request.ComponentId, 1, 'ComponentId was not set to expected value');
    assert.strictEqual(request.DirectoryId, 2, 'DirectoryId was not set to expected value');
  });
});
