"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const GetTasksRequest = require('./get-tasks-request');

describe('GetTasksRequest', () => {
  it('should define the properties: DirectoryId and set them on init', () => {
    let request = new GetTasksRequest(1);
    expect(request).to.have.property('DirectoryId');
    assert.strictEqual(request.DirectoryId, 1, 'DirectoryId was not set to the expected value');
  })
});
