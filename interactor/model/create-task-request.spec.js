"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const CreateTaskRequest = require('./create-task-request');

describe('CreateTaskRequest', () => {
  it('should define the properties: DirectoryId, Name and set them on init', () => {
    let request = new CreateTaskRequest(1, 'finish create task interactor');
    expect(request).to.have.property('DirectoryId');
    expect(request).to.have.property('Name');
    assert.strictEqual(request.DirectoryId, 1, 'DirectoryId was not set to expected value');
    assert.strictEqual(request.Name, 'finish create task interactor', 'Name was not set to expected value');
  });
});
