"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const Shared = require('../../../_shared');
const UpdateEventRequest = require('./update-event-request');

describe('UpdateEventRequest', () => {
  it('should inherit ComponentRequest', () => {
    let request = new UpdateEventRequest();
    expect(request).to.be.an.instanceof(Shared.ComponentRequest);
  });

  it('should define the properties: EntityId, EntityType, EventDateTime', () => {
    let request = new UpdateEventRequest();
    expect(request).to.have.property('EntityId');
    expect(request).to.have.property('EntityType');
    expect(request).to.have.property('EventDateTime');
  });

  it('should set the defined properties on init', () => {
    let request = new UpdateEventRequest(1, Shared.Constants.EntityType.TASK, '2017-07-12 18:30:00');
    assert.strictEqual(request.EntityId, 1, 'EntityId was not set to expected value');
    assert.strictEqual(request.EntityType, Shared.Constants.EntityType.TASK, 'EntityType was not set to expected value');
    assert.strictEqual(request.EventDateTime, '2017-07-12 18:30:00', 'EventDateTime was not set to expected value');
  });
});
