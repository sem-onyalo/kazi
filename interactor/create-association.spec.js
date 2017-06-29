"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const CreateAssociation = require('./create-association');
const CreateAssociationRequest = require('./model/create-association-request');
const Datasource = require('../datasource');
const Entity = require('../entity');

describe('CreateAssociation', () => {
  let associationRepository;
  let createAssociation;

  beforeEach(function () {
    associationRepository = new Datasource.AssociationRepository();
    createAssociation = new CreateAssociation(associationRepository);
  });

  describe('execute(createAssociationRequest)', () => {
    it('should export function', () => {
      expect(createAssociation.execute).to.be.a('function');
    });

    it('should create the association', () => {
      let request = new CreateAssociationRequest('My Association', 'Company');
      let expectedNewAssociation = new Entity.Association(0, 'my-association', 'My Association', 'Company');
      let expectedCreatedAssociation = new Entity.Association(1, 'my-association', 'My Association', 'Company');

      let getAssociationByKeyStub = sinon
        .stub(associationRepository, 'getByKey')
        .returns(null);

      let createAssociationStub = sinon
        .stub(associationRepository, 'create')
        .returns(expectedCreatedAssociation);

      let actualCreatedAssociation = createAssociation.execute(request);

      getAssociationByKeyStub.restore();
      createAssociationStub.restore();

      sinon.assert.calledOnce(getAssociationByKeyStub);
      sinon.assert.calledWith(getAssociationByKeyStub, 'my-association');

      sinon.assert.calledOnce(createAssociationStub);
      sinon.assert.calledWith(createAssociationStub, expectedNewAssociation);

      assert.deepEqual(actualCreatedAssociation, expectedCreatedAssociation, 'Returned created association object does not equal expected');
    });

    it('should throw an exception if trying to create an association with a key that already exists', () => {
      let request = new CreateAssociationRequest('My Association', 'Company');

      let getAssociationByKeyStub = sinon
        .stub(associationRepository, 'getByKey')
        .returns(new Entity.Association(1, 'my-association', 'My Association', 'Company'));

      let createAssociationFn = function () { createAssociation.execute(request); };

      expect(createAssociationFn).to.throw('An association with that name already exists');

      getAssociationByKeyStub.restore();
    });
  });
});
