"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');
require('chai').use(require('chai-as-promised'));

const CreateTask = require('./create-task');
const CreateTaskRequest = require('./model/create-task-request');
const Datasource = require('../datasource');
const Entity = require('../entity');

describe('CreateTaskRequest', () => {
  let directoryRepository;
  let taskRepository;
  let createTask;

  beforeEach(function() {
    directoryRepository = new Datasource.DirectoryRepository();
    taskRepository = new Datasource.TaskRepository();
    createTask = new CreateTask(directoryRepository, taskRepository);
  });

  describe('execute(createTaskRequest)', () => {
    it('should export function', () => {
      expect(createTask.execute).to.be.a('function');
    });

    it('should throw an exception if the task name is empty', () => {
      let promises = [];
      let data = ['', undefined, null];

      for (let i = 0; i < data.length; i++) {
        let request = new CreateTaskRequest(1, data[i]);
        promises.push(assert.isRejected(createTask.execute(request), 'The task name cannot be empty'));
      }

      return Promise.all(promises);
    });

    it('should throw an exception if the directory does not exist', () => {
      let request = new CreateTaskRequest(1, 'finish create task interactor');

      let getDirectoryByIdStub = sinon
        .stub(directoryRepository, 'getById')
        .returns(null);

      return assert.isRejected(createTask.execute(request), 'The specified directory does not exist')
        .then(() => {
          sinon.assert.calledOnce(getDirectoryByIdStub);
          sinon.assert.calledWith(getDirectoryByIdStub, 1);
        });
    });

    it('should create the task', async () => {
      let request = new CreateTaskRequest(1, 'finish create task interactor');
      let directory = new Entity.Directory(1, 8, 0, 'inbox', 'Inbox');
      let expectedNewTask = new Entity.Task(0, 'finish create task interactor', 1);
      let expectedCreatedTask = new Entity.Task(1, 'finish create task interactor', 1, 'inbox', 'Inbox');
      let getDirectoryByIdStub = sinon
        .stub(directoryRepository, 'getById')
        .returns(directory);

      let createTaskStub = sinon
        .stub(taskRepository, 'create')
        .returns(expectedCreatedTask);

      let task = await createTask.execute(request);

      createTaskStub.restore();

      sinon.assert.calledOnce(createTaskStub);
      sinon.assert.calledWith(createTaskStub, expectedNewTask);
      assert.deepEqual(task, expectedCreatedTask, 'The returned task was not the expected value');
    });
  });
});
