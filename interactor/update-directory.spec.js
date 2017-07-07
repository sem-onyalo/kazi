"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const Datasource = require('../datasource');
const Entity = require('../entity');
const UpdateDirectory = require('./update-directory');
const UpdateDirectoryRequest = require('./model/update-directory-request');

describe('UpdateDirectory', () => {
  let directoryRepository;
  let updateDirectory;
  let request;

  beforeEach(function () {
    directoryRepository = new Datasource.DirectoryRepository();
    updateDirectory = new UpdateDirectory(directoryRepository);
    request = new UpdateDirectoryRequest(2, 'Dev Inbox', 1, 1);
  });

  describe('execute(updateDirectoryRequest)', () => {
    it('should export function', () => {
      expect(updateDirectory.execute).to.be.a('function');
    });

    it('should throw an exception if the directory name is empty', () => {
      let data = [null, undefined, ''];
      for (let i = 0; i < data.length; i++) {
        request.DirectoryName = data[i];
        let updateDirectoryFn = function () { updateDirectory.execute(request); };
        expect(updateDirectoryFn).to.throw('The directory name cannot be empty');
      }
    });

    it('should update the directory', () => {
      let expectedDirectory = new Entity.Directory(2, 1, 1, 'dev-inbox', 'Dev Inbox');
      let updateDirectoryStub = sinon
        .stub(directoryRepository, 'update')
        .returns(expectedDirectory);

      let directory = updateDirectory.execute(request);

      updateDirectoryStub.restore();
      sinon.assert.calledOnce(updateDirectoryStub);
      sinon.assert.calledWith(updateDirectoryStub, expectedDirectory);
      assert.strictEqual(directory, expectedDirectory, 'The returned directory was not the expected value');
    });

    it('should throw an exception if the directory was not updated or the directory does not exist', () => {
      let updateDirectoryStub = sinon
        .stub(directoryRepository, 'update')
        .returns(null);

      let updateDirectoryFn = function () { updateDirectory.execute(request); };
      expect(updateDirectoryFn).to.throw('There was an error updating the directory or the directory does not exist');
      updateDirectoryStub.restore();
    });
  });
});
