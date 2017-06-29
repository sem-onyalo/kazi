"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const CreateAssociationRequest = require('./create-association-request');

describe('CreateAssociationRequest', () => {
  it('should define the properties: Name, Alias and set them on init', () => {
    let request = new CreateAssociationRequest('My Association', 'Company');
    expect(request).to.have.property('Name');
    expect(request).to.have.property('Alias');
    assert.strictEqual(request.Name, 'My Association', 'Name was not set to expected value');
    assert.strictEqual(request.Alias, 'Company', 'Alias was not set to the expected value');
  });
});
