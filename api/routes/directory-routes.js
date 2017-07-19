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
    .get(async (req, res) => {
      try {
        let getDirectoriesInteractor = DependencyFactory.resolve(GetDirectoriesInteractor);
        let request = new GetDirectoriesRequest(req.params.associationId);
        let directories = await getDirectoriesInteractor.execute(request);
        res.json(directories);
      } catch (ex) {
        res.json({ error: ex });
      }
    });

  app.route('/directories')
    .post(async (req, res) => {
      try {
        let createDirectoryInteractor = DependencyFactory.resolve(CreateDirectoryInteractor);
        let request = new CreateDirectoryRequest(req.body.Name, req.body.ParentId, req.body.AssociationId);
        let directory = await createDirectoryInteractor.execute(request);
        res.json(directory);
      } catch (ex) {
        res.json({ error: ex });
      }
    });

  app.route('/directories/:directoryId')
    .put(async (req, res) => {
      try {
        let updateDirectoryInteractor = DependencyFactory.resolve(UpdateDirectoryInteractor);
        let request = new UpdateDirectoryRequest(req.params.directoryId, req.body.Name, req.body.ParentId, req.body.AssociationId);
        let directory = await updateDirectoryInteractor.execute(request);
        res.json(directory);
      } catch (ex) {
        res.json({ error: ex });
      }
    })
    .delete(async (req, res) => {
      try {
        let deleteDirectoryInteractor = DependencyFactory.resolve(DeleteDirectoryInteractor);
        let request = new DeleteDirectoryRequest(req.params.directoryId);
        await deleteDirectoryInteractor.execute(request);
        res.json({ status: 'OK'});
      } catch (ex) {
        res.json({ error: ex });
      }
    });
}
