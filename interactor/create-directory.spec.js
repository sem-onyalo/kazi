"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');
require('chai').use(require('chai-as-promised'));
// require('sinon-as-promised');

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

    it('should throw an exception if the directory name is empty', () => {
      let promises = [];
      let data = ['', undefined, null];

      for (let i = 0; i < data.length; i++) {
        let request = new CreateDirectoryRequest(data[i], 16, 8);
        promises.push(assert.isRejected(createDirectory.execute(request), 'The directory name cannot be empty'));
      }
      
      return Promise.all(promises);
    });

    it('should throw an exception if the association does not exist', () => {
      let request = new CreateDirectoryRequest('My Directory', 16, 8);
      
      let getAssociationByIdStub = sinon
        .stub(associationRepository, 'getById')
        .returns(null);

      return assert.isRejected(createDirectory.execute(request), 'The specified association does not exist')
        .then(() => {
          sinon.assert.calledOnce(getAssociationByIdStub);
          sinon.assert.calledWith(getAssociationByIdStub, 8);
        });
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

      return assert.isRejected(createDirectory.execute(request), 'The specified parent directory does not exist')
        .then(() => {
          sinon.assert.calledOnce(getDirectoryByIdStub);
          sinon.assert.calledWith(getDirectoryByIdStub, 16);
        });
    });

    it('should throw an exception if trying to create a direcory with a key already exists', () => {
      let associationId = 8;
      let request = new CreateDirectoryRequest('Dev Inbox', 1, associationId);
      let association = new Entity.Association(associationId, 'my-association', 'My Association', 'Company');
      let parentDirectory = new Entity.Directory(1, associationId, 0, 'inbox', 'Inbox');
      let directory = new Entity.Directory(16, associationId, 1, 'dev-inbox', 'Dev Inbox');

      let getAssociationByIdStub = sinon
        .stub(associationRepository, 'getById')
        .returns(association);

      let getDirectoryByIdStub = sinon
        .stub(directoryRepository, 'getById')
        .returns(parentDirectory);

      let getDirectoryByKeyStub = sinon
        .stub(directoryRepository, 'getByKeyAndAssociationId')
        .returns(directory);

      return assert.isRejected(createDirectory.execute(request), 'The specified directory already exists')
        .then(() => {
          sinon.assert.calledOnce(getDirectoryByKeyStub);
          sinon.assert.calledWith(getDirectoryByKeyStub, 'dev-inbox', associationId);
        });
    });

    it('should create a directory', async () => {
      let request = new CreateDirectoryRequest('Dev Inbox', 1, 8);
      let association = new Entity.Association(8, 'my-association', 'My Association', 'Company');
      let parentDirectory = new Entity.Directory(1, 8, 0, 'inbox', 'Inbox');
      let expectedNewDirectory = new Entity.Directory(0, 8, 1, 'dev-inbox', 'Dev Inbox');
      let expectedCreatedDirectory = new Entity.Directory(16, 8, 1, 'dev-inbox', 'Dev Inbox');

      let getAssociationByIdStub = sinon
        .stub(associationRepository, 'getById')
        .returns(association);

      let getDirectoryByIdStub = sinon
        .stub(directoryRepository, 'getById')
        .returns(parentDirectory);

      let getDirectoryByKeyStub = sinon
        .stub(directoryRepository, 'getByKeyAndAssociationId')
        .returns(null);

      let createDirectoryStub = sinon
        .stub(directoryRepository, 'create')
        .returns(expectedCreatedDirectory);

      let directory = await createDirectory.execute(request);

      getAssociationByIdStub.restore();
      getDirectoryByIdStub.restore();
      getDirectoryByKeyStub.restore();
      createDirectoryStub.restore();

      sinon.assert.calledOnce(createDirectoryStub);
      sinon.assert.calledWith(createDirectoryStub, expectedNewDirectory);

      assert.deepEqual(directory, expectedCreatedDirectory, 'Returned created directory object does not equal expected');
    });
  })
});
