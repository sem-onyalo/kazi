"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const Directory = require('./directory');

describe('Entity.Directory', () => {
  it('should define propreties: Id, AssociationId, ParentId, Key, Name', () => {
    let directory = new Directory(123, 1, 0, 'my-inbox', 'My Inbox');
    expect(directory).to.have.property('Id');
    expect(directory).to.have.property('AssociationId');
    expect(directory).to.have.property('ParentId');
    expect(directory).to.have.property('Key');
    expect(directory).to.have.property('Name');
    assert.strictEqual(directory.Id, 123, 'Id was not set to expected value on init');
    assert.strictEqual(directory.AssociationId, 1, 'AssociationId was ont set to expected value on init');
    assert.strictEqual(directory.ParentId, 0, 'ParentId was not set to expected value on init');
    assert.strictEqual(directory.Key, 'my-inbox', 'Key was not set to expected value on init');
    assert.strictEqual(directory.Name, 'My Inbox', 'Name was not set to expected value on init');
  });
});
