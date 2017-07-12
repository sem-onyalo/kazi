"use strict";

const expect = require('chai').expect;

const Datasource = require('../datasource');

describe('Datasource', () => {
  it('should define the properties: AssociationRepository, ComponentRepository, DirectoryRepository, TaskRepository, UserRepository', () => {
    expect(Datasource).to.have.property('AssociationRepository');
    expect(Datasource).to.have.property('ComponentRepository');
    expect(Datasource).to.have.property('DirectoryRepository');
    expect(Datasource).to.have.property('TaskRepository');
    expect(Datasource).to.have.property('UserRepository');
  });
});
