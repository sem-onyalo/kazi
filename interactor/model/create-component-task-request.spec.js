"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const CreateComponentTaskRequest = require('./create-component-task-request');

describe('CreateComponentTaskRequest', () => {
  it('should define the properties: ComponentId, TaskId and set them on init', () => {
    let request = new CreateComponentTaskRequest(1, 2);
    expect(request).to.have.property('ComponentId');
    expect(request).to.have.property('TaskId');
    assert.strictEqual(request.ComponentId, 1, 'ComponentId was not set to expected value');
    assert.strictEqual(request.TaskId, 2, 'TaskId was not set to expected value');
  });
});
