"use strict";

const AuthenticateUserInteractor = require('../../interactor/authenticate-user');
const AuthenticateUserRequest = require('../../interactor/model/authenticate-user-request');
const CreateUserInteractor = require('../../interactor/create-user');
const CreateUserRequest = require('../../interactor/model/create-user-request');
const DependencyFactory = require('../../factory/dependency-factory');
const RegisterUserInteractor = require('../../interactor/register-user');
const RegisterUserRequest = require('../../interactor/model/register-user-request');
const SecurityHelper = require('../../util/security-helper');
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
        console.log(ex);
        res.json({ status: 'Internal Server Error', error: ex.message });
      }
    });

  app.route('/users/authenticate')
    .post(async (req, res) => {
      try {
        let authenticateUserInteractor = DependencyFactory.resolve(AuthenticateUserInteractor);
        let request = new AuthenticateUserRequest(req.body.Username, req.body.Password);
        let user = await authenticateUserInteractor.execute(request);
        if (user) {
          req.session.user = user;
          SecurityHelper.setSessionUser(user);
          res.json(user);
        } else {
          res.status(401).send('Authorization Required');
        }
      } catch (ex) {
        console.log(ex);
        res.json({ status: 'Internal Server Error', error: ex.message });
      }
    });

  app.route('/users/register')
    .post(async (req, res) => {
      try {
        let registerUserInteractor = DependencyFactory.resolve(RegisterUserInteractor);
        let request = new RegisterUserRequest(req.body.Username, req.body.Password, req.body.AuthToken);
        let user = await registerUserInteractor.execute(request);
        if (user) {
          req.session.user = user;
          SecurityHelper.setSessionUser(user);
          res.json(user);
        } else {
          res.status(401).send('Authorization Required');
        }
      } catch (ex) {
        console.log(ex);
        res.json({ status: 'Internal Server Error', error: ex.message });
      }
    });

  app.route('/users/expire')
    .get((req, res) => {
      try {
        SecurityHelper.setSessionUser(undefined);
        req.session.destroy();
        res.redirect('/');
      } catch (ex) {
        res.json({ status: 'Internal Server Error', error: ex.message });
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
        res.json({ status: 'Internal Server Error', error: ex.message });
      }
    });
}
