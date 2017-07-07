"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const DeleteTaskRequest = require('./delete-task-request');

describe('DeleteTaskRequest', () => {
  it('should define the properties: TaskId and set them on init', () => {
    let request = new DeleteTaskRequest(1);
    expect(request).to.have.property('TaskId');
    assert.strictEqual(request.TaskId, 1, 'TaskId was not set to expected value');
  });
});
