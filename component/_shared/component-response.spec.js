"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const ComponentResponse = require('./component-response');

describe('ComponentResponse', () => {
  it('should define the properties: EntityId, EntityType and set them on init', () => {
    let response = new ComponentResponse(1, 2);
    expect(response).to.have.property('EntityId');
    expect(response).to.have.property('EntityType');
    assert.strictEqual(response.EntityId, 1, 'EntityId was not set to expected value');
    assert.strictEqual(response.EntityType, 2, 'EntityType was not set to expected value');
  });
});
