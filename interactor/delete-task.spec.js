"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const Datasource = require('../datasource');
const DeleteTask = require('./delete-task');
const DeleteTaskRequest = require('./model/delete-task-request');

describe('DeleteTask', () => {
  let taskRepository;
  let deleteTask;

  beforeEach(function () {
    taskRepository = new Datasource.TaskRepository();
    deleteTask = new DeleteTask(taskRepository);
  });

  describe('execute(deleteTaskRequest)', () => {
    it('should export function', () => {
      expect(deleteTask.execute).to.be.a('function');
    });

    it('should delete the task', () => {
      let deleteTaskStub = sinon
        .stub(taskRepository, 'delete')
        .returns(true);

      let request = new DeleteTaskRequest(1);
      deleteTask.execute(request);

      deleteTaskStub.restore();
      sinon.assert.calledOnce(deleteTaskStub);
      sinon.assert.calledWith(deleteTaskStub, 1);
    });

    it('should throw an expection if the task was not deleted or the task does not exist', () => {
      let deleteTaskStub = sinon
        .stub(taskRepository, 'delete')
        .returns(false);

      let request = new DeleteTaskRequest(1);
      let deleteTaskFn = function () { deleteTask.execute(request); };

      expect(deleteTaskFn).to.throw('There was an error deleting the task or the task does not exist');
      deleteTaskStub.restore();
    });
  });
});
