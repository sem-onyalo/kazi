"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const Datasource = require('../datasource');
const DeleteDirectory = require('./delete-directory');
const DeleteDirectoryRequest = require('./model/delete-directory-request');

describe('DeleteDirectory', () => {
  let directoryRepository;
  let deleteDirectory;

  beforeEach(function() {
    directoryRepository = new Datasource.DirectoryRepository;
    deleteDirectory = new DeleteDirectory(directoryRepository);
  });

  describe('execute(deleteDirectoryRequest)', () => {
    it('should export function', () => {
      expect(deleteDirectory.execute).to.be.a('function');
    });

    it('should delete the directory', () => {
      let deleteDirectoryStub = sinon
        .stub(directoryRepository, 'delete')
        .returns(true);

      let request = new DeleteDirectoryRequest(1);
      deleteDirectory.execute(request);

      deleteDirectoryStub.restore();
      sinon.assert.calledOnce(deleteDirectoryStub);
      sinon.assert.calledWith(deleteDirectoryStub, 1);
    });

    it('should throw an exception if the directory could not be deleted or it did not exist', () => {
      let deleteDirectoryStub = sinon
        .stub(directoryRepository, 'delete')
        .returns(false);

      let request = new DeleteDirectoryRequest(1);
      let deleteDirectoryFn = function () { deleteDirectory.execute(request); };

      expect(deleteDirectoryFn).to.throw('There was an error deleting the directory or the directory does not exist');
      deleteDirectoryStub.restore();
    });
  });
});
