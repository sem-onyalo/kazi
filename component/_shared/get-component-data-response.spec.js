"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const GetComponentDataResponse = require('./get-component-data-response');

describe('GetComponentDataResponse', () => {
  it('should define the properties: EntityId, EntityType, DataObject and set them on init', () => {
    let response = new GetComponentDataResponse(1, 2);
    expect(response).to.have.property('EntityId');
    expect(response).to.have.property('EntityType');
    expect(response).to.have.property('DataObject');
    assert.strictEqual(response.EntityId, 1, 'EntityId was not set to expected value');
    assert.strictEqual(response.EntityType, 2, 'EntityType was not set to expected value');
  });
});
