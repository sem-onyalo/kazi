"use strict";

const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;

const Datasource = require('../datasource');
const Entity = require('../entity');
const GetComponents = require('./get-components');
const GetComponentsRequest = require('./model/get-components-request');

describe('GetComponents', () => {
  let componentRepository;
  let getComponents;

  beforeEach(function() {
    componentRepository = new Datasource.ComponentRepository();
    getComponents = new GetComponents(componentRepository);
  });

  describe('execute()', () => {
    it('should export function', () => {
      expect(getComponents.execute).to.be.a('function');
    });

    it('should call component repository\'s get method', async () => {
      let request = new GetComponentsRequest();

      let getComponentsStub = sinon
        .stub(componentRepository, 'get');

      await getComponents.execute(request);

      sinon.assert.calledOnce(getComponentsStub);
    });
    
    it('should call component repository\'s getRelationshipByDirectoryId method', async () => {
      let request = new GetComponentsRequest(1);

      let getComponentsStub = sinon
        .stub(componentRepository, 'getRelationshipByDirectoryId');

      await getComponents.execute(request);

      sinon.assert.calledOnce(getComponentsStub);
    });

    it('should return a collection of components', async () => {
      let request = new GetComponentsRequest();
      let expectedComponents = [
        new Entity.Component(1, 'attendance', 'Attendance'),
        new Entity.Component(2, 'volunteer', 'Volunteer'),
        new Entity.Component(3, 'location', 'Location')
      ];

      let getComponentsStub = sinon
        .stub(componentRepository, 'get')
        .returns(Promise.resolve(expectedComponents));

      let components = await getComponents.execute(request);

      assert.strictEqual(components, expectedComponents, 'The returned components collection was not the expected value');
    });
  });
});
