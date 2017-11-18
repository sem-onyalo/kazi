"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');
require('chai').use(require('chai-as-promised'));

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

    it('should throw an exception if the association name is empty', async () => {
      let promises = [];
      let data = ['', undefined, null];

      for (let i = 0; i < data.length; i++) {
        let request = new CreateAssociationRequest(data[i], 'Company');      
        promises.push(assert.isRejected(createAssociation.execute(request), 'The association name cannot be empty'));
      }

      return Promise.all(promises);
    });

    it('should throw an exception if trying to create an association with a key that already exists', async () => {
      let request = new CreateAssociationRequest('My Association', 'Company');

      let getAssociationByKeyStub = sinon
        .stub(associationRepository, 'getByKey')
        .returns(new Entity.Association(1, 'my-association', 'My Association', 'Company'));

      return assert.isRejected(createAssociation.execute(request), 'An association with that name already exists');
    });

    it('should create the association', async () => {
      let request = new CreateAssociationRequest('My Association', 'Company');
      let expectedNewAssociation = new Entity.Association(0, 'my-association', 'My Association', 'Company');
      let expectedCreatedAssociation = new Entity.Association(1, 'my-association', 'My Association', 'Company');

      let getAssociationByKeyStub = sinon
        .stub(associationRepository, 'getByKey')
        .returns(null);

      let createAssociationStub = sinon
        .stub(associationRepository, 'create')
        .returns(Promise.resolve(expectedCreatedAssociation));

      let actualCreatedAssociation = await createAssociation.execute(request);

      getAssociationByKeyStub.restore();
      createAssociationStub.restore();

      sinon.assert.calledOnce(getAssociationByKeyStub);
      sinon.assert.calledWith(getAssociationByKeyStub, 'my-association');

      sinon.assert.calledOnce(createAssociationStub);
      sinon.assert.calledWith(createAssociationStub, expectedNewAssociation);

      assert.deepEqual(actualCreatedAssociation, expectedCreatedAssociation, 'Returned created association object does not equal expected');
    });
  });
});
