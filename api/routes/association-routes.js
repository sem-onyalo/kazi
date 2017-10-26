"use strict";

const CreateAssociationInteractor = require('../../interactor/create-association');
const CreateAssociationRequest = require('../../interactor/model/create-association-request');
const DependencyFactory = require('../../factory/dependency-factory');
const GetAssociationInteractor = require('../../interactor/get-association');
const GetAssociationRequest = require('../../interactor/model/get-association-request');
const GetUserAssociationsInteractor = require('../../interactor/get-user-associations');
const GetUserAssociationsRequest = require('../../interactor/model/get-user-associations-request');
const SetupAssociationInteractor = require('../../interactor/setup-association');
const SetupAssociationRequest = require('../../interactor/model/setup-association-request');

module.exports = function(app) {
  app.route('/associations')
    .get(async (req, res) => {
      try {
        if (req.session && req.session.user) {
          let getUserAssociations = DependencyFactory.resolve(GetUserAssociationsInteractor);
          let request = new GetUserAssociationsRequest(req.session.user.Id);
          let associations = await getUserAssociations.execute(request);
          res.json(associations);
        } else {
          res.status(401).send('Authorization Required');
        }
      } catch (ex) {
        res.json({ status: 'Internal Server Error', error: typeof ex === 'string' ? ex : ex.message });
      }
    })
    .post(async (req, res) => {
      try {
        let createAssociationInteractor = DependencyFactory.resolve(CreateAssociationInteractor);
        let request = new CreateAssociationRequest(req.body.Name, req.body.Alias);
        let association = await createAssociationInteractor.execute(request);
        res.json(association);
      } catch (ex) {
        res.json({ error: 'Unable to create the association' });
      }
    });

  app.route('/associations/:key')
    .get(async (req, res) => {
      try {
        let getAssociationInteractor = DependencyFactory.resolve(GetAssociationInteractor);
        let request = new GetAssociationRequest(req.session && req.session.user);
        request.AssociationKey = req.params.key;
        let association = await getAssociationInteractor.execute(request);
        res.json(association);
      } catch (ex) {
        res.json({ status: 'Internal Server Error', error: typeof ex === 'string' ? ex : ex.message });
      }
    });

  app.route('/associations/setup')
    .post(async (req, res) => {
      try {
        let setupAssociationInteractor = DependencyFactory.resolve(SetupAssociationInteractor);
        let request = new SetupAssociationRequest(req.body.AssociationName, req.body.AssociationAlias, req.body.DefaultDirectoryName, req.body.AdminFirstName, req.body.AdminLastName, req.body.AdminUsername,req.body.AdminPassword);
        let response = await setupAssociationInteractor.execute(request);
        res.json(response);
      } catch (ex) {
        res.json({ status: 'Internal Server Error', error: typeof ex === 'string' ? ex : ex.message });
      }
    });
}
