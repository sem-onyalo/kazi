"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const Datasource = require('../datasource');
const Entity = require('../entity');
const GetTasks = require('./get-tasks');
const GetTasksRequest = require('./model/get-tasks-request');

describe('GetTasks', () => {
  let taskRepository;
  let getTasks;

  beforeEach(function () {
    taskRepository = new Datasource.TaskRepository();
    getTasks = new GetTasks(taskRepository);
  })

  describe('execute(getTasksRequest)', () => {
    it('should export function', () => {
      expect(getTasks.execute).to.be.a('function');
    });

    it('should return a collection of tasks', () => {
      let request = new GetTasksRequest(1);
      let expectedTasks = [
        new Entity.Task(10, 'task 1', 1, 'my-inbox', 'My Inbox'),
        new Entity.Task(11, 'task 2', 1, 'my-inbox', 'My Inbox'),
        new Entity.Task(12, 'task 3', 1, 'my-inbox', 'My Inbox')
      ];
      let getTasksByDirectoryIdStub = sinon
        .stub(taskRepository, 'getByDirectoryId')
        .returns(expectedTasks);

      let tasks = getTasks.execute(request);

      sinon.assert.calledOnce(getTasksByDirectoryIdStub);
      sinon.assert.calledWith(getTasksByDirectoryIdStub, 1);
      assert.deepEqual(tasks, expectedTasks, 'Returned tasks collection was not expected value');
    });
  });
});
