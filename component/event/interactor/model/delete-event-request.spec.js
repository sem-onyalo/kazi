"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const DeleteEventRequest = require('./delete-event-request');
const Shared = require('../../../_shared');

describe('DeleteEventRequest', () => {
  it('should inherit ComponentRequest', () => {
    let request = new DeleteEventRequest();
    expect(request).to.be.an.instanceof(Shared.ComponentRequest);
  });

  it('should define the properties: EntityId, EntityType', () => {
    let request = new DeleteEventRequest();
    expect(request).to.have.property('EntityId');
    expect(request).to.have.property('EntityType');
  });

  it('should set the defined properties on init', () => {
    let request = new DeleteEventRequest(1, Shared.Constants.EntityType.TASK);
    assert.strictEqual(request.EntityId, 1, 'EntityId was not set to expected value');
    assert.strictEqual(request.EntityType, Shared.Constants.EntityType.TASK, 'EntityType was not set to expected value');
  });
});
