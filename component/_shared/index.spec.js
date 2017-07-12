"use strict";

const expect = require('chai').expect;

const Shared = require('./index');

describe('Shared', () => {
  it('should define the properties: ComponentRequest, ComponentResponse, Constants', () => {
    expect(Shared).to.have.property('Constants');
    expect(Shared).to.have.property('ComponentRequest');
    expect(Shared).to.have.property('ComponentResponse');
  });
});
