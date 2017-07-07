"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const Task = require('./task');

describe('Task', () => {
  it('should define the properties: Id, Name, DirectoryId, DirectoryKey, DirectoryName and set them on init', () => {
    let task = new Task(123, 'task 1', 1, 'my-inbox', 'My Inbox');
    expect(task).to.have.property('Id');
    expect(task).to.have.property('Name');
    expect(task).to.have.property('DirectoryId');
    expect(task).to.have.property('DirectoryKey');
    expect(task).to.have.property('DirectoryName');
    assert.strictEqual(task.Id, 123, 'Id not set to expected value on init');
    assert.strictEqual(task.Name, 'task 1', 'Name not set to expected value on init');
    assert.strictEqual(task.DirectoryId, 1, 'DirectoryId not set to expected value on init');
    assert.strictEqual(task.DirectoryKey, 'my-inbox', 'DirectoryKey not set to expected value');
    assert.strictEqual(task.DirectoryName, 'My Inbox', 'DirectoryName not set to expected value on init');
  });
});
