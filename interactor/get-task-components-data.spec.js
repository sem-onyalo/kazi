"use strict";

const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const assert = chai.assert;
chai.use(require('chai-as-promised'));

const Datasource = require('../datasource');
const GetTaskComponentsData = require('./get-task-components-data');
const GetTaskComponentsDataRequest = require('./model/get-task-components-data-request');

describe('GetTaskComponentsData', () => {
  let componentRepository;
  let getTaskComponentsData;

  beforeEach(() => {
    componentRepository = new Datasource.ComponentRepository();
    getTaskComponentsData = new GetTaskComponentsData(componentRepository);
  });

  describe('execute(getTaskComponentsDataRequest)', () => {
    it('should export function', () => {
      expect(getTaskComponentsData.execute).to.be.a('function');
    });

    it('should get the components from the component repository', async () => {
      let taskId = 1;
      let getComponentsByTaskIdStub = sinon
        .stub(componentRepository, 'getByTaskId')
        .returns([]);

      let request = new GetTaskComponentsDataRequest(taskId);
      await getTaskComponentsData.execute(request)

      sinon.assert.calledWith(getComponentsByTaskIdStub, taskId);
    });
  });
});
