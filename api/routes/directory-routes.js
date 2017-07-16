"use strict";

const CreateDirectoryInteractor = require('../../interactor/create-directory');
const CreateDirectoryRequest = require('../../interactor/model/create-directory-request');
const DeleteDirectoryInteractor = require('../../interactor/delete-directory');
const DeleteDirectoryRequest = require('../../interactor/model/delete-directory-request');
const DependencyFactory = require('../../factory/dependency-factory');
const GetDirectoriesInteractor = require('../../interactor/get-directories');
const GetDirectoriesRequest = require('../../interactor/model/get-directories-request');
const UpdateDirectoryInteractor = require('../../interactor/update-directory');
const UpdateDirectoryRequest = require('../../interactor/model/update-directory-request');

module.exports = function(app) {
  app.route('/associations/:associationId/directories')
    .get((req, res) => {
      let getDirectoriesInteractor = DependencyFactory.resolve(GetDirectoriesInteractor);
      let request = new GetDirectoriesRequest(req.params.associationId);
      let directories = getDirectoriesInteractor.execute(request);
      res.json(directories);
    });

  app.route('/directories')
    .post((req, res) => {
      let createDirectoryInteractor = DependencyFactory.resolve(CreateDirectoryInteractor);
      let request = new CreateDirectoryRequest(req.body.Name, req.body.ParentId, req.body.AssociationId);
      let directory = createDirectoryInteractor.execute(request);
      res.json(directory);
    });

  app.route('/directories/:directoryId')
    .put((req, res) => {
      let updateDirectoryInteractor = DependencyFactory.resolve(UpdateDirectoryInteractor);
      let request = new UpdateDirectoryRequest(req.params.directoryId, req.body.Name, req.body.ParentId, req.body.AssociationId);
      let directory = updateDirectoryInteractor.execute(request);
      res.json(directory);
    })
    .delete((req, res) => {
      let deleteDirectoryInteractor = DependencyFactory.resolve(DeleteDirectoryInteractor);
      let request = new DeleteDirectoryRequest(req.params.directoryId);
      deleteDirectoryInteractor.execute(request);
      res.json('OK');
    });
}
