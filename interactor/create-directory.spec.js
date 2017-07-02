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

    it('should throw an exception if the directory name is empty', () => {
      let request = new CreateDirectoryRequest('', 16, 8);
      let createDirectoryFn = function () { createDirectory.execute(request); };
      expect(createDirectoryFn).to.throw('The directory name cannot be empty');

      request = new CreateDirectoryRequest(null, 16, 8);
      createDirectoryFn = function () { createDirectory.execute(request); };
      expect(createDirectoryFn).to.throw('The directory name cannot be empty');

      request = new CreateDirectoryRequest(undefined, 16, 8);
      createDirectoryFn = function () { createDirectory.execute(request); };
      expect(createDirectoryFn).to.throw('The directory name cannot be empty');
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

      let createDirectoryFn = function () { createDirectory.execute(request); };

      expect(createDirectoryFn).to.throw('The specified parent directory does not exist');

      getAssociationByIdStub.restore();
      getDirectoryByIdStub.restore();

      sinon.assert.calledOnce(getDirectoryByIdStub);
      sinon.assert.calledWith(getDirectoryByIdStub, 16);
    });

    it('should throw an exception if trying to create a direcory with a key already exists', () => {
      let request = new CreateDirectoryRequest('Dev Inbox', 1, 8);
      let association = new Entity.Association(8, 'my-association', 'My Association', 'Company');
      let parentDirectory = new Entity.Directory(1, 8, 0, 'inbox', 'Inbox');
      let directory = new Entity.Directory(16, 8, 1, 'dev-inbox', 'Dev Inbox');

      let getAssociationByIdStub = sinon
        .stub(associationRepository, 'getById')
        .returns(association);

      let getDirectoryByIdStub = sinon
        .stub(directoryRepository, 'getById')
        .returns(parentDirectory);

      let getDirectoryByKeyStub = sinon
        .stub(directoryRepository, 'getByKey')
        .returns(directory);

      let createDirectoryFn = function () { createDirectory.execute(request); };

      expect(createDirectoryFn).to.throw('The specified directory already exists');

      getAssociationByIdStub.restore();
      getDirectoryByIdStub.restore();
      getDirectoryByKeyStub.restore();

      sinon.assert.calledOnce(getDirectoryByKeyStub);
      sinon.assert.calledWith(getDirectoryByKeyStub, 'dev-inbox');
    });

    it('should create a directory', () => {
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
        .stub(directoryRepository, 'getByKey')
        .returns(null);

      let createDirectoryStub = sinon
        .stub(directoryRepository, 'create')
        .returns(expectedCreatedDirectory);

      let directory = createDirectory.execute(request);

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
