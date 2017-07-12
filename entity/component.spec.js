"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const Component = require('./component');

describe('Component', () => {
  it('should define properties: Id, Key, Name, TaskId, DirectoryId, AssociationId and set them on init', () => {
    let component = new Component(12, 'user-attendance', 'User Attendance', 3, 4, 5);
    expect(component).to.have.property('Id');
    expect(component).to.have.property('Key');
    expect(component).to.have.property('Name');
    expect(component).to.have.property('TaskId');
    expect(component).to.have.property('DirectoryId');
    expect(component).to.have.property('AssociationId');
    assert.strictEqual(component.Id, 12, 'Id was not set to expected value on init');
    assert.strictEqual(component.Key, 'user-attendance', 'Key was not set to expected value on init');
    assert.strictEqual(component.Name, 'User Attendance', 'Name was not set to expected value on init');
    assert.strictEqual(component.TaskId, 3, 'TaskId was not set to expected value on init');
    assert.strictEqual(component.DirectoryId, 4, 'DirectoryId was not set to expected value on init');
    assert.strictEqual(component.AssociationId, 5, 'AssociationId was not set to expected value on init');
  });
});
