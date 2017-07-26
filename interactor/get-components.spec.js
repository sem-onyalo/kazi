"use strict";

const chai = require('chai');
const sinon = require('sinon');
const assert = chai.assert;
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const Datasource = require('../datasource');
const Entity = require('../entity');
const GetComponents = require('./get-components');

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

    it('should call ComponentRepository.get ot retrieve the components', async () => {
      let getComponentsStub = sinon
        .stub(componentRepository, 'get');

      await getComponents.execute();
      getComponentsStub.restore();

      sinon.assert.calledOnce(getComponentsStub);
    });

    it('should return a collection of components', async () => {
      let expectedComponents = [
        new Entity.Component(1, 'attendance', 'Attendance'),
        new Entity.Component(2, 'volunteer', 'Volunteer'),
        new Entity.Component(3, 'location', 'Location')
      ];
      let getComponentsStub = sinon
        .stub(componentRepository, 'get')
        .returns(Promise.resolve(expectedComponents));

      let components = await getComponents.execute();

      assert.strictEqual(components, expectedComponents, 'The returned components collection was not the expected value');
    });
  });
});
