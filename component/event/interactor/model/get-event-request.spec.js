"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const GetEventRequest = require('./get-event-request');
const Shared = require('../../../_shared');

describe('GetEventRequest', () => {
  it('should inherit ComponentRequest', () => {
    let request = new GetEventRequest();
    expect(request).to.be.an.instanceof(Shared.ComponentRequest);
  });

  it('should define the properties: EntityId, EntityType, DisplayType', () => {
    let request = new GetEventRequest();
    expect(request).to.have.property('EntityId');
    expect(request).to.have.property('EntityType');
    expect(request).to.have.property('DisplayType');
  });

  it('should set the defined properties on init', () => {
    let request = new GetEventRequest(1, Shared.Constants.EntityType.TASK, Shared.Constants.ComponentDisplayType.TASK_ADDON);
    assert.strictEqual(request.EntityId, 1, 'EntityId was not set to expected value');
    assert.strictEqual(request.EntityType, Shared.Constants.EntityType.TASK, 'EntityType was not set to expected value');
    assert.strictEqual(request.DisplayType, Shared.Constants.ComponentDisplayType.TASK_ADDON, 'DisplayType was not set to expected value');
  });
});
