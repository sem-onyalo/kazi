"use strict";

const expect = require('chai').expect;

const Constants = require('./constants');

describe('Constants', () => {
  it('should define properties: ComponentDisplayType, EntityType, REGEX_PASSWORD, USER_AUTH_TOKEN_LENGTH', () => {
    expect(Constants).to.have.property('ComponentDisplayType');
    expect(Constants).to.have.property('EntityType');
    expect(Constants).to.have.property('REGEX_PASSWORD');
    expect(Constants).to.have.property('USER_AUTH_TOKEN_LENGTH');
  });
});
