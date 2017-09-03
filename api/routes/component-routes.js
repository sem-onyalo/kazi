"use strict";

const CreateComponentDirectoryInteractor = require('../../interactor/create-component-directory');
const CreateComponentDirectoryRequest = require('../../interactor/model/create-component-directory-request');
const DependencyFactory = require('../../factory/dependency-factory');
const GetComponentsInteractor = require('../../interactor/get-components');
const GetComponentsRequest = require('../../interactor/model/get-components-request');

module.exports = function(app) {
  app.route('/components')
    .get(async (req, res) => {
      try {
        let getComponents = DependencyFactory.resolve(GetComponentsInteractor);
        let request = new GetComponentsRequest(req.query.directoryid);
        let components = await getComponents.execute(request);
        res.json(components);
      } catch (ex) {
        console.log(ex);
        res.json({ error: ex.message });
      }
    });

  app.route('/components/:componentId/directories/:directoryId')
    .post(async (req, res) => {
      try {
        let createComponentDirectory = DependencyFactory.resolve(CreateComponentDirectoryInteractor);
        let request = new CreateComponentDirectoryRequest(req.params.componentId, req.params.directoryId);
        let response = await createComponentDirectory.execute(request);
        res.json({ Component: response, Status: 'CREATED' });
      } catch (ex) {
        console.log(ex);
        res.json({ error: ex });
      }
    });
}
