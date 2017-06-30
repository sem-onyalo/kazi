"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const GetDirectoriesRequest = require('./get-directories-request');

describe('GetDirectoriesRequest', () => {
  it('should define the properties: AssociationId and set them on init', () => {
    let request = new GetDirectoriesRequest(5);
    expect(request).to.have.property('AssociationId');
    assert.strictEqual(request.AssociationId, 5, 'AssociationId was not set to expected value');
  });
});
