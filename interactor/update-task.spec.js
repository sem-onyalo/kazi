"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const Datasource = require('../datasource');
const Entity = require('../entity');
const UpdateTask = require('./update-task');
const UpdateTaskRequest = require('./model/update-task-request');

describe('UpdateTask', () => {
  let taskRepository;
  let updateTask;

  beforeEach(function () {
    taskRepository = new Datasource.TaskRepository();
    updateTask = new UpdateTask(taskRepository);
  });

  describe('execute(updateTaskRequest)', () => {
    it('should export function', () => {
      expect(updateTask.execute).to.be.a('function');
    });

    it('should throw an exception if the task name is empty', () => {
      let request = new UpdateTaskRequest(1, '');
      let updateTaskFn = function() { updateTask.execute(request); };
      expect(updateTaskFn).to.throw('The task name cannot be empty');

      request = new UpdateTaskRequest(1, null);
      updateTaskFn = function() { updateTask.execute(request); };
      expect(updateTaskFn).to.throw('The task name cannot be empty');

      request = new UpdateTaskRequest(1, undefined);
      updateTaskFn = function() { updateTask.execute(request); };
      expect(updateTaskFn).to.throw('The task name cannot be empty');
    });

    it('should throw an exception if the task id does not exist', () => {
      let request = new UpdateTaskRequest(1, 'finish update task interactor');
      let getTaskByIdStub = sinon
        .stub(taskRepository, 'getById')
        .returns(null);

      let updateTaskFn = function() { updateTask.execute(request); };

      expect(updateTaskFn).to.throw('The specified task does not exist');

      getTaskByIdStub.restore();

      sinon.assert.calledOnce(getTaskByIdStub);
      sinon.assert.calledWith(getTaskByIdStub, 1);
    });

    it('should update the task', () => {
      let request = new UpdateTaskRequest(1, 'finish update task interactor');
      let existingTask = new Entity.Task(1, 'finish create task interactor', 1, 'inbox', 'Inbox');
      let expectedUpdatedTask = new Entity.Task(1, 'finish update task interactor', 1, 'inbox', 'Inbox');
      let getTaskByIdStub = sinon
        .stub(taskRepository, 'getById')
        .returns(existingTask);
      let updateTaskStub = sinon
        .stub(taskRepository, 'update')
        .returns(expectedUpdatedTask);

      let task = updateTask.execute(request);

      getTaskByIdStub.restore();
      updateTaskStub.restore();

      sinon.assert.calledOnce(updateTaskStub);
      sinon.assert.calledWith(updateTaskStub, expectedUpdatedTask);
      assert.deepEqual(task, expectedUpdatedTask, 'The returned task was not the expected value');
    });
  });
});
