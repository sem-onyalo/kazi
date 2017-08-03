"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const GetComponentDataRequest = require('./get-component-data-request');

describe('GetComponentDataRequest', () => {
  it('should define the properties: EntityId, EntityType, DisplayType and set them on init', () => {
    let request = new GetComponentDataRequest(1, 2, 3);
    expect(request).to.have.property('EntityId');
    expect(request).to.have.property('EntityType');
    expect(request).to.have.property('DisplayType');
    assert.strictEqual(request.EntityId, 1, 'EntityId was not set to expected value');
    assert.strictEqual(request.EntityType, 2, 'EntityType was not set to expected value');
    assert.strictEqual(request.DisplayType, 3, 'DisplayType was not set to expected value');
  });
});
