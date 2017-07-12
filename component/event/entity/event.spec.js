"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const Event = require('./event');

describe('Event', () => {
  it('should define the properties: Id, TaskId, EventDateTime and set them on init', () => {
    let event = new Event(1, 2, '2017-07-12 18:30:00');
    expect(event).to.have.property('Id');
    expect(event).to.have.property('TaskId');
    expect(event).to.have.property('EventDateTime');
    assert.strictEqual(event.Id, 1, 'Id was not set to expected value');
    assert.strictEqual(event.TaskId, 2, 'TaskId was not set to expected value');
    assert.strictEqual(event.EventDateTime, '2017-07-12 18:30:00', 'EventDateTime was not set to expected value');
  });
});
