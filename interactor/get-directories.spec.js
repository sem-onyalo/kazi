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

    it('should return a collection of directories', () => {
      let request = new GetDirectoriesRequest(5);
      let expectedDirectories = [
        new Entity.Directory(1, 5, 0, 'inbox', 'Inbox'),
        new Entity.Directory(2, 5, 1, 'dev-inbox', 'Dev Inbox'),
        new Entity.Directory(3, 5, 1, 'qa-inbox', 'QA Inbox')
      ];
      let getDirectoriesByAssociationIdStub = sinon
        .stub(directoryRepository, 'getByAssociationId')
        .returns(expectedDirectories);

      let directories = getDirectories.execute(request);

      sinon.assert.calledOnce(getDirectoriesByAssociationIdStub);
      sinon.assert.calledWith(getDirectoriesByAssociationIdStub, 5);
      assert.deepEqual(directories, expectedDirectories, 'Returned directories collection was not expected value');
    });
  });
});
