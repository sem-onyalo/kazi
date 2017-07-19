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
    .get(async (req, res) => {
      try {
        let getTasksInteractor = DependencyFactory.resolve(GetTasksInteractor);
        let request = new GetTasksRequest(req.params.directoryId);
        let tasks = await getTasksInteractor.execute(request);
        res.json(tasks);
      } catch (ex) {
        res.json({ error: ex });
      }
    });

  app.route('/tasks')
    .post(async (req, res) => {
      try {
        let createTaskInteractor = DependencyFactory.resolve(CreateTaskInteractor);
        let request = new CreateTaskRequest(req.body.DirectoryId, req.body.Name);
        let task = await createTaskInteractor.execute(request);
        res.json(task);
      } catch (ex) {
        res.json({ error: ex });
      }
    });

  app.route('/tasks/:taskId')
    .put(async (req, res) => {
      try {
        let updateTaskInteractor = DependencyFactory.resolve(UpdateTaskInteractor);
        let request = new UpdateTaskRequest(req.params.taskId, req.body.Name);
        let task = await updateTaskInteractor.execute(request);
        res.json(task);
      } catch (ex) {
        res.json({ error: ex });
      }
    })
    .delete(async (req, res) => {
      try {
        let deleteTaskInteractor = DependencyFactory.resolve(DeleteTaskInteractor);
        let request = new DeleteTaskRequest(req.params.taskId);
        await deleteTaskInteractor.execute(request);
        res.json({ status: 'OK' });
      } catch (ex) {
        res.json({ error: ex });
      }
    });
}
