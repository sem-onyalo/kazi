"use strict";

const CreateDirectoryInteractor = require('../../interactor/create-directory');
const CreateDirectoryRequest = require('../../interactor/model/create-directory-request');
const DeleteDirectoryInteractor = require('../../interactor/delete-directory');
const DeleteDirectoryRequest = require('../../interactor/model/delete-directory-request');
const DependencyFactory = require('../../factory/dependency-factory');
const GetDirectoryComponentDataInteractor = require('../../interactor/get-directory-component-data');
const GetDirectoryComponentDataRequest = require('../../interactor/model/get-directory-component-data-request');
const GetDirectoryComponentsDataInteractor = require('../../interactor/get-directory-components-data');
const GetDirectoryComponentsDataRequest = require('../../interactor/model/get-directory-components-data-request');
const GetDirectoriesInteractor = require('../../interactor/get-directories');
const GetDirectoriesRequest = require('../../interactor/model/get-directories-request');
const PostDirectoryComponentDataInteractor = require('../../interactor/post-directory-component-data');
const PostDirectoryComponentDataRequest = require('../../interactor/model/post-directory-component-data-request');
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
        res.json({ status: 'Internal Server Error', error: ex.message });
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
        res.json({ status: 'Internal Server Error', error: ex.message });
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
        res.json({ status: 'Internal Server Error', error: ex.message });
      }
    })
    .delete(async (req, res) => {
      try {
        let deleteDirectoryInteractor = DependencyFactory.resolve(DeleteDirectoryInteractor);
        let request = new DeleteDirectoryRequest(req.params.directoryId);
        await deleteDirectoryInteractor.execute(request);
        res.json({ status: 'OK'});
      } catch (ex) {
        res.json({ status: 'Internal Server Error', error: ex.message });
      }
    });

  app.route('/directories/:directoryId/components')
    .get(async (req, res) => {
      try {
        let interactor = DependencyFactory.resolve(GetDirectoryComponentsDataInteractor);
        let request = new GetDirectoryComponentsDataRequest(req.params.directoryId);
        let response = await interactor.execute(request);
        res.json({ Components: response, status: 'OK' });
      } catch (ex) {
        console.log(ex);
        res.json({ status: 'Internal Server Error', error: ex.message });
      }
    });

  app.route('/directories/:directoryId/components/:componentKey')
    .get(async (req, res) => {
      try {
        let interactor = DependencyFactory.resolve(GetDirectoryComponentDataInteractor);
        let request = new GetDirectoryComponentDataRequest(req.params.directoryId, req.params.componentKey);
        let response = await interactor.execute(request);
        res.json({ Component: response, status: 'OK' });
      } catch (ex) {
        console.log(ex);
        res.json({ status: 'Internal Server Error', error: ex.message });
      }
    })
    .post(async(req, res) => {
      try {
        let interactor = DependencyFactory.resolve(PostDirectoryComponentDataInteractor);
        let request = new PostDirectoryComponentDataRequest(req.params.directoryId, req.params.componentKey, req.body.Data);
        let response = await interactor.execute(request);
        res.json({ Data: response, status: 'OK' });
      } catch (ex) {
        console.log(ex);
        res.json({ status: 'Internal Server Error', error: ex.message });
      }
    });
}
