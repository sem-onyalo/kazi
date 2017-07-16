"use strict";

const CreateTaskInteractor = require('../../interactor/create-task');
const CreateTaskRequest = require('../../interactor/model/create-task-request');
const DeleteTaskInteractor = require('../../interactor/delete-task');
const DeleteTaskRequest = require('../../interactor/model/delete-task-request');
const DependencyFactory = require('../../factory/dependency-factory');
const GetTasksInteractor = require('../../interactor/get-tasks');
const GetTasksRequest = require('../../interactor/model/get-tasks-request');
const UpdateTaskInteractor = require('../../interactor/update-task');
const UpdateTaskRequest = require('../../interactor/model/update-task-request');

module.exports = function(app) {
  app.route('/directories/:directoryId/tasks')
    .get((req, res) => {
      let getTasksInteractor = DependencyFactory.resolve(GetTasksInteractor);
      let request = new GetTasksRequest(req.params.directoryId);
      let tasks = getTasksInteractor.execute(request);
      res.json(tasks);
    });

  app.route('/tasks')
    .post((req, res) => {
      let createTaskInteractor = DependencyFactory.resolve(CreateTaskInteractor);
      let request = new CreateTaskRequest(req.body.DirectoryId, req.body.Name);
      let task = createTaskInteractor.execute(request);
      res.json(task);
    });

  app.route('/tasks/:taskId')
    .put((req, res) => {
      let updateTaskInteractor = DependencyFactory.resolve(UpdateTaskInteractor);
      let request = new UpdateTaskRequest(req.params.taskId, req.body.Name);
      let task = updateTaskInteractor.execute(request);
      res.json(task);
    })
    .delete((req, res) => {
      let deleteTaskInteractor = DependencyFactory.resolve(DeleteTaskInteractor);
      let request = new DeleteTaskRequest(req.params.taskId);
      deleteTaskInteractor.execute(request);
      res.json('OK');
    });
}
