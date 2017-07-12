"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const GetEventResponse = require('./get-event-response');
const Shared = require('../../../_shared');

describe('GetEventResponse', () => {
  it('should inherit ComponentResponse', () => {
    let response = new GetEventResponse();
    expect(response).to.be.an.instanceof(Shared.ComponentResponse);
  });

  it('should define the properties: EntityId, EntityType, EventDateTime', () => {
    let response = new GetEventResponse();
    expect(response).to.have.property('EntityId');
    expect(response).to.have.property('EntityType');
    expect(response).to.have.property('EventDateTime');
  });

  it('should set the defined properties on init', () => {
    let response = new GetEventResponse(1, Shared.Constants.EntityType.TASK, '2017-07-12 18:30:00');
    assert.strictEqual(response.EntityId, 1, 'EntityId was not set to expected value');
    assert.strictEqual(response.EntityType, Shared.Constants.EntityType.TASK, 'EntityType was not set to expected value');
    assert.strictEqual(response.EventDateTime, '2017-07-12 18:30:00', 'EventDateTime was not set to expected value');
  });
});
