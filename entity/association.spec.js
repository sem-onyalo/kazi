"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const Association = require('./association');

describe('Entity.Association', () => {
  it('should define the properties: Id, Key, Name, Alias and set them on init', () => {
    let association = new Association(123, 'my-team', 'My Team', 'Company');
    expect(association).to.have.property('Id');
    expect(association).to.have.property('Key');
    expect(association).to.have.property('Name');
    expect(association).to.have.property('Alias');
    assert.strictEqual(association.Id, 123, 'Id was not set to expected value on init');
    assert.strictEqual(association.Key, 'my-team', 'Key was not set to expected value on init');
    assert.strictEqual(association.Name, 'My Team', 'Name was not set to expected value on init');
    assert.strictEqual(association.Alias, 'Company', 'Alias was not set to expected value on init');
  });
});
