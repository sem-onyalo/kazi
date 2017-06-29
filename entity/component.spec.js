"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const Component = require('./component');

describe('Entity.Component', () => {
  it('should define properties: Id, Key, Name and set them on init', () => {
    let component = new Component(12, 'user-attendance', 'User Attendance');
    expect(component).to.have.property('Id');
    expect(component).to.have.property('Key');
    expect(component).to.have.property('Name');
    assert.strictEqual(component.Id, 12, 'Id was not set to expected value on init');
    assert.strictEqual(component.Key, 'user-attendance', 'Key was not set to expected value on init');
    assert.strictEqual(component.Name, 'User Attendance', 'Name was not set to expected value on init');
  });
});
