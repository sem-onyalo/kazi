"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');
require('chai').use(require('chai-as-promised'));

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

    it('should delete the task', async () => {
      let deleteTaskStub = sinon
        .stub(taskRepository, 'delete')
        .returns(true);

      let request = new DeleteTaskRequest(1);
      await deleteTask.execute(request);

      sinon.assert.calledOnce(deleteTaskStub);
      sinon.assert.calledWith(deleteTaskStub, 1);
    });

    it('should throw an expection if the task was not deleted or the task does not exist', () => {
      let deleteTaskStub = sinon
        .stub(taskRepository, 'delete')
        .returns(0);

      let request = new DeleteTaskRequest(1);

      return assert.isRejected(deleteTask.execute(request), 'There was an error deleting the task or the task does not exist');
    });
  });
});
