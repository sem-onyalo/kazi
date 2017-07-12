"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const CreateComponentDirectory = require('./create-component-directory');
const CreateComponentDirectoryRequest = require('./model/create-component-directory-request');
const Datasource = require('../datasource');
const Entity = require('../entity');

describe('CreateComponentDirectory', () => {
  let componentRepository;
  let createComponentDirectory;

  beforeEach(function () {
    componentRepository = new Datasource.ComponentRepository();
    createComponentDirectory = new CreateComponentDirectory(componentRepository);
  });

  describe('execute(createComponentDirectoryRequest)', () => {
    it('should export function', () => {
      expect(createComponentDirectory.execute).to.be.a('function');
    });

    it('should add the component to the directory', () => {
      let componentId = 1, directoryId = 2;
      let expectedComponent = new Entity.Component(componentId, 'event', 'Event');
      expectedComponent.DirectoryId = directoryId;
      let addComponentToDirectoryStub = sinon
        .stub(componentRepository, 'addToDirectory')
        .returns(expectedComponent);

      let request = new CreateComponentDirectoryRequest(componentId, directoryId);
      let component = createComponentDirectory.execute(request);

      sinon.assert.calledWith(addComponentToDirectoryStub, componentId, directoryId);
      assert.deepEqual(component, expectedComponent, 'The returned component was not the expected value');
    });

    it('should throw an expection if there was an error adding the component to the directory or the component or directory does not exist', () => {
      let componentId = 1, directoryId = 2;
      let addComponentToDirectoryStub = sinon
        .stub(componentRepository, 'addToDirectory')
        .returns(null);

      let request = new CreateComponentDirectoryRequest(componentId, directoryId);
      let createFn = function () { createComponentDirectory.execute(request); };
      expect(createFn).to.throw('There was an error adding the component to the directory or the component or directory does not exist');
    });
  });
});
