"use strict";

const IocContainer = require('node-ioc');

var _defaultContainer = new IocContainer();

_defaultContainer.registerWithTypes().as(require('../datasource/association-repository'));
_defaultContainer.registerWithTypes().as(require('../datasource/directory-repository'));
_defaultContainer.registerWithTypes().as(require('../datasource/task-repository'));
_defaultContainer.registerWithTypes().as(require('../datasource/user-repository'));
_defaultContainer.registerWithTypes(require('../datasource/association-repository')).as(require('../interactor/create-association'));
_defaultContainer.registerWithTypes(require('../datasource/association-repository')).as(require('../interactor/get-user-associations'));
_defaultContainer.registerWithTypes(require('../datasource/association-repository'),require('../datasource/directory-repository')).as(require('../interactor/create-directory'));
_defaultContainer.registerWithTypes(require('../datasource/association-repository'),require('../datasource/user-repository')).as(require('../interactor/create-user'));
_defaultContainer.registerWithTypes(require('../interactor/create-association'),require('../interactor/create-directory'),require('../interactor/create-user')).as(require('../interactor/setup-association'));
_defaultContainer.registerWithTypes(require('../datasource/directory-repository')).as(require('../interactor/delete-directory'));
_defaultContainer.registerWithTypes(require('../datasource/directory-repository')).as(require('../interactor/get-directories'));
_defaultContainer.registerWithTypes(require('../datasource/directory-repository')).as(require('../interactor/update-directory'));
_defaultContainer.registerWithTypes(require('../datasource/directory-repository'),require('../datasource/task-repository')).as(require('../interactor/create-task'));
_defaultContainer.registerWithTypes(require('../datasource/task-repository')).as(require('../interactor/delete-task'));
_defaultContainer.registerWithTypes(require('../datasource/task-repository')).as(require('../interactor/get-tasks'));
_defaultContainer.registerWithTypes(require('../datasource/task-repository')).as(require('../interactor/update-task'));

module.exports = {
  resolve: function(type, container) {
    this._container = container !== undefined ? container : _defaultContainer;
    return this._container.resolve(type);
  }
}