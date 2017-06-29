"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const CreateDirectory = require('./create-directory');
const CreateDirectoryRequest = require('./model/create-directory-request');
const Datasource = require('../datasource');
const Entity = require('../entity');

describe('CreateDirectory', () => {
  let associationRepository;
  let directoryRepository;
  let createDirectory;

  beforeEach(function () {
    associationRepository = new Datasource.AssociationRepository();
    directoryRepository = new Datasource.DirectoryRepository();
    createDirectory = new CreateDirectory(associationRepository, directoryRepository);
  });

  describe('execute(createDirectoryRequest)', () => {
    it('should export function', () => {
      expect(createDirectory.execute).to.be.a('function');
    });

    it('should throw an exception if the association does not exist', () => {
      let request = new CreateDirectoryRequest('My Directory', 16, 8);
      let getAssociationByIdStub = sinon
        .stub(associationRepository, 'getById')
        .returns(null);

      let createAssociationFn = function () { createDirectory.execute(request); };

      expect(createAssociationFn).to.throw('The specified association does not exist');

      getAssociationByIdStub.restore();

      sinon.assert.calledOnce(getAssociationByIdStub);
      sinon.assert.calledWith(getAssociationByIdStub, 8);
    });

    it('should throw an expection if the parent directory does not exist', () => {
      let request = new CreateDirectoryRequest('My Directory', 16, 8);
      let association = new Entity.Association(8, 'my-association', 'My Association', 'Company');
      let getAssociationByIdStub = sinon
        .stub(associationRepository, 'getById')
        .returns(association);
      let getDirectoryByIdStub = sinon
        .stub(directoryRepository, 'getById')
        .returns(null);

      createDirectory.execute(request);

      getAssociationByIdStub.restore();
      getDirectoryByIdStub.restore();

      sinon.assert.calledOnce(getDirectoryByIdStub);
      sinon.assert.calledWith(getDirectoryByIdStub, 16);
    });
  })
});
