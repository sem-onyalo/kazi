"use strict";

const CreateTaskInteractor = require('../../interactor/create-task');
const CreateTaskRequest = require('../../interactor/model/create-task-request');
const DeleteTaskInteractor = require('../../interactor/delete-task');
const DeleteTaskRequest = require('../../interactor/model/delete-task-request');
const DependencyFactory = require('../../factory/dependency-factory');
const GetTaskComponentDataInteractor = require('../../interactor/get-task-component-data');
const GetTaskComponentDataRequest = require('../../interactor/model/get-task-component-data-request');
const GetTaskComponentsDataInteractor = require('../../interactor/get-task-components-data');
const GetTaskComponentsDataRequest = require('../../interactor/model/get-task-components-data-request');
const GetTasksInteractor = require('../../interactor/get-tasks');
const GetTasksRequest = require('../../interactor/model/get-tasks-request');
const PostTaskComponentDataInteractor = require('../../interactor/post-task-component-data');
const PostTaskComponentDataRequest = require('../../interactor/model/post-task-component-data-request');
const UpdateTaskInteractor = require('../../interactor/update-task');
const UpdateTaskRequest = require('../../interactor/model/update-task-request');

module.exports = function(app) {
  app.route('/directories/:directoryId/tasks')
    .get(async (req, res) => {
      try {
        let isUserSession = req.session && req.session.user;
        let getTasksInteractor = DependencyFactory.resolve(GetTasksInteractor);
        let request = new GetTasksRequest(isUserSession, req.params.directoryId);
        let tasks = await getTasksInteractor.execute(request);
        res.json(tasks);
      } catch (ex) {
        res.json({ status: 'Internal Server Error', error: typeof ex === 'string' ? ex : ex.message });
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
        res.json({ status: 'Internal Server Error', error: typeof ex === 'string' ? ex : ex.message });
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
        res.json({ status: 'Internal Server Error', error: typeof ex === 'string' ? ex : ex.message });
      }
    })
    .delete(async (req, res) => {
      try {
        let deleteTaskInteractor = DependencyFactory.resolve(DeleteTaskInteractor);
        let request = new DeleteTaskRequest(req.params.taskId);
        await deleteTaskInteractor.execute(request);
        res.json({ status: 'OK' });
      } catch (ex) {
        res.json({ status: 'Internal Server Error', error: typeof ex === 'string' ? ex : ex.message });
      }
    });

  app.route('/tasks/:taskId/components')
    .get(async (req, res) => {
      try {
        let interactor = DependencyFactory.resolve(GetTaskComponentsDataInteractor);
        let request = new GetTaskComponentsDataRequest(req.params.taskId, req.query);
        let response = await interactor.execute(request);
        res.json({ Data: response, status: 'OK' });
      } catch (ex) {
        res.json({ status: 'Internal Server Error', error: typeof ex === 'string' ? ex : ex.message });
      }
    })
    .post(async(req, res) => {
      try {
        let interactor = DependencyFactory.resolve(PostTaskComponentDataInteractor);
        let request = new PostTaskComponentDataRequest(req.params.taskId, req.body.ComponentId, req.query.displaytype, req.body.Data);
        let response = await interactor.execute(request);
        res.json({ Data: response, status: 'OK' });
      } catch (ex) {
        res.json({ status: 'Internal Server Error', error: typeof ex === 'string' ? ex : ex.message });
      }
    });

  app.route('/tasks/:taskId/components/:componentId')
    .get(async (req, res) => {
      try {
        let interactor = DependencyFactory.resolve(GetTaskComponentDataInteractor);
        let request = new GetTaskComponentDataRequest(req.params.taskId, req.params.componentId, req.query);
        let response = await interactor.execute(request);
        res.json({ Data: response, status: 'OK' });
      } catch (ex) {
        res.json({ status: 'Internal Server Error', error: typeof ex === 'string' ? ex : ex.message });
      }
    });
}
