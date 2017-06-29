"use strict";

const expect = require('chai').expect;

const Datasource = require('../datasource');

describe('Datasource', () => {
  it('should define the properties: AssociationRepository, DirectoryRepository', () => {
    expect(Datasource).to.have.property('AssociationRepository');
    expect(Datasource).to.have.property('DirectoryRepository');
  });
});
