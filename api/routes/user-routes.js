"use strict";

const AuthenticateUserInteractor = require('../../interactor/authenticate-user');
const AuthenticateUserRequest = require('../../interactor/model/authenticate-user-request');
const CreateUserInteractor = require('../../interactor/create-user');
const CreateUserRequest = require('../../interactor/model/create-user-request');
const DependencyFactory = require('../../factory/dependency-factory');
const UpdateUserInteractor = require('../../interactor/update-user');
const UpdateUserRequest = require('../../interactor/model/update-user-request');

module.exports = function (app) {
  app.route('/users')
    .post(async (req, res) => {
      try {
        let createUserInteractor = DependencyFactory.resolve(CreateUserInteractor);
        let request = new CreateUserRequest(req.body.FirstName, req.body.LastName, req.body.Username, req.body.Password, null, req.body.UserRole, req.body.AssociationId);
        let user = await createUserInteractor.execute(request);
        res.json(user);
      } catch (ex) {
        res.json({ error: ex });
      }
    });

  app.route('/users/authenticate')
    .post(async (req, res) => {
      try {
        let authenticateUserInteractor = DependencyFactory.resolve(AuthenticateUserInteractor);
        let request = new AuthenticateUserRequest(req.body.Username, req.body.Password);
        let user = await authenticateUserInteractor.execute(request);
        if (user) req.session.user = user;
        res.redirect('/associations');
      } catch (ex) {
        res.json({ error: ex });
      }
    });

  app.route('/users/expire')
    .get((req, res) => {
      try {
        req.session.reset();
        res.redirect('/');
      } catch (ex) {
        res.json({ error: ex });
      }
    });

  app.route('/users/:userId')
    .put(async (req, res) => {
      try {
        let updateUserInteractor = DependencyFactory.resolve(UpdateUserInteractor);
        let request = new UpdateUserRequest(req.params.userId, req.body.FirstName, req.body.LastName, req.body.Username, req.body.Password, null, req.body.UserRole, req.body.AssociationId);
        let user = await updateUserInteractor.execute(request);
        res.json(user);
      } catch (ex) {
        res.json({ error: ex });
      }
    });
}
