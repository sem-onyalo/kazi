"use strict";

const expect = require('chai').expect;

const Constants = require('./constants');

describe('Constants', () => {
  it('should define properties: REGEX_PASSWORD', () => {
    expect(Constants).to.have.property('REGEX_PASSWORD');
  });
});
