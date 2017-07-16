"use strict";

const CreateAssociationInteractor = require('../../interactor/create-association');
const CreateAssociationRequest = require('../../interactor/model/create-association-request');
const DependencyFactory = require('../../factory/dependency-factory');
const GetUserAssociationsInteractor = require('../../interactor/get-user-associations');
const GetUserAssociationsRequest = require('../../interactor/model/get-user-associations-request');
const SetupAssociationInteractor = require('../../interactor/setup-association');
const SetupAssociationRequest = require('../../interactor/model/setup-association-request');

module.exports = function(app) {
  app.route('/users/:userId/associations')
    .get((req, res) => {
      let getUserAssociations = DependencyFactory.resolve(GetUserAssociationsInteractor);
      let request = new GetUserAssociationsRequest(req.params.userId);
      let associations = getUserAssociations.execute(request);
      res.json(associations);
    });

  app.route('/associations')
    .post((req, res) => {
      let createAssociationInteractor = DependencyFactory.resolve(CreateAssociationInteractor);
      let request = new CreateAssociationRequest(req.body.Name, req.body.Alias);
      let association = createAssociationInteractor.execute(request);
      res.json(association);
    });

  app.route('/associations/setup')
    .post((req, res) => {
      let setupAssociationInteractor = DependencyFactory.resolve(SetupAssociationInteractor);
      let request = new SetupAssociationRequest(req.body.AssociationName, req.body.AssociationAlias, req.body.DefaultDirectoryName, req.body.AdminFirstName, req.body.AdminLastName, req.body.AdminUsername,req.body.AdminPassword);
      let response = setupAssociationInteractor.execute(request);
      res.json(response);
    });
}
