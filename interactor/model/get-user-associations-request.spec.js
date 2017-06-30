"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const GetUserAssociationsRequest = require('./get-user-associations-request');

describe('GetUserAssociationsRequest', () => {
  it('should define the properties: UserId and set them on init', () => {
    let request = new GetUserAssociationsRequest(1);
    expect(request).to.have.property('UserId');
    assert.strictEqual(request.UserId, 1, 'UserId was not set to expected value');
  });
});
