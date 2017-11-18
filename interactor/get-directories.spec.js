"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const GetDirectories = require('./get-directories');
const GetDirectoriesRequest = require('./model/get-directories-request');
const Datasource = require('../datasource');
const Entity = require('../entity');

describe('GetDirectories', () => {
  let directoryRepository;
  let getDirectories;

  beforeEach(function () {
    directoryRepository = new Datasource.DirectoryRepository();
    getDirectories = new GetDirectories(directoryRepository);
  });

  describe('execute(getDirectoriesRequest)', () => {
    it('should export function', () => {
      expect(getDirectories.execute).to.be.a('function');
    });

    it('should return a collection of directories using the directory repository\'s getPublicByAssociationId method if user session is true', async () => {
      let request = new GetDirectoriesRequest(false, 5);

      let expectedDirectories = [
        new Entity.Directory(1, 5, 0, 'inbox', 'Inbox'),
        new Entity.Directory(2, 5, 1, 'dev-inbox', 'Dev Inbox'),
        new Entity.Directory(3, 5, 1, 'qa-inbox', 'QA Inbox')
      ];

      let getDirectoriesStub = sinon
        .stub(directoryRepository, 'getPublicByAssociationId')
        .returns(expectedDirectories);

      let directories = await getDirectories.execute(request);

      sinon.assert.calledOnce(getDirectoriesStub);
      sinon.assert.calledWith(getDirectoriesStub, 5);
      assert.deepEqual(directories, expectedDirectories, 'Returned directories collection was not expected value');
    });
    
    it('should return a collection of directories using the directory repository\'s getPublicByAssociationId method if user session is false', async () => {
      let request = new GetDirectoriesRequest(true, 5);

      let expectedDirectories = [
        new Entity.Directory(1, 5, 0, 'inbox', 'Inbox'),
        new Entity.Directory(2, 5, 1, 'dev-inbox', 'Dev Inbox'),
        new Entity.Directory(3, 5, 1, 'qa-inbox', 'QA Inbox')
      ];

      let getDirectoriesStub = sinon
        .stub(directoryRepository, 'getByAssociationId')
        .returns(expectedDirectories);

      let directories = await getDirectories.execute(request);

      sinon.assert.calledOnce(getDirectoriesStub);
      sinon.assert.calledWith(getDirectoriesStub, 5);
      assert.deepEqual(directories, expectedDirectories, 'Returned directories collection was not expected value');
    });
  });
});
