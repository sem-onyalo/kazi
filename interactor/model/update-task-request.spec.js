"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const UpdateTaskRequest = require('./update-task-request');

describe('UpdateTaskRequest', () => {
  it('should define the properties: TaskId, TaskName and set them on init', () => {
    let request = new UpdateTaskRequest(1, 'finish update task interactor');
    expect(request).to.have.property('TaskId');
    expect(request).to.have.property('TaskName');
    assert.strictEqual(request.TaskId, 1, 'TaskId was not set to expected value');
    assert.strictEqual(request.TaskName, 'finish update task interactor', 'TaskName was not set to expected value');
  });
});
