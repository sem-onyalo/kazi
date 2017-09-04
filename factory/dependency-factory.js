"use strict";

const IocContainer = require('node-ioc');

var _defaultContainer = new IocContainer();

_defaultContainer.register(() => require('../datasource/db-context')).as(require('../datasource/db-context'));
_defaultContainer.registerWithTypes(require('../datasource/db-context')).as(require('../datasource/association-repository'));
_defaultContainer.registerWithTypes(require('../datasource/db-context')).as(require('../datasource/component-repository'));
_defaultContainer.registerWithTypes(require('../datasource/db-context')).as(require('../datasource/directory-repository'));
_defaultContainer.registerWithTypes(require('../datasource/db-context')).as(require('../datasource/task-repository'));
_defaultContainer.registerWithTypes(require('../datasource/db-context')).as(require('../datasource/user-repository'));
_defaultContainer.registerWithTypes(require('../datasource/association-repository')).as(require('../interactor/create-association'));
_defaultContainer.registerWithTypes(require('../datasource/association-repository')).as(require('../interactor/get-user-associations'));
_defaultContainer.registerWithTypes(require('../datasource/association-repository'),require('../datasource/directory-repository')).as(require('../interactor/create-directory'));
_defaultContainer.registerWithTypes(require('../datasource/association-repository'),require('../datasource/user-repository')).as(require('../interactor/create-user'));
_defaultContainer.registerWithTypes(require('../datasource/component-repository')).as(require('../interactor/create-component-directory'));
_defaultContainer.registerWithTypes(require('../datasource/component-repository')).as(require('../interactor/get-components'));
_defaultContainer.registerWithTypes(require('../datasource/component-repository')).as(require('../interactor/get-directory-component-data'));
_defaultContainer.registerWithTypes(require('../datasource/component-repository')).as(require('../interactor/get-directory-components-data'));
_defaultContainer.registerWithTypes(require('../datasource/component-repository')).as(require('../interactor/post-directory-component-data'));
_defaultContainer.registerWithTypes(require('../datasource/component-repository')).as(require('../interactor/get-task-components-data'));
_defaultContainer.registerWithTypes(require('../datasource/component-repository')).as(require('../interactor/post-task-component-data'));
_defaultContainer.registerWithTypes(require('../interactor/create-association'),require('../interactor/create-directory'),require('../interactor/create-user')).as(require('../interactor/setup-association'));
_defaultContainer.registerWithTypes(require('../datasource/directory-repository')).as(require('../interactor/delete-directory'));
_defaultContainer.registerWithTypes(require('../datasource/directory-repository')).as(require('../interactor/get-directories'));
_defaultContainer.registerWithTypes(require('../datasource/directory-repository')).as(require('../interactor/update-directory'));
_defaultContainer.registerWithTypes(require('../datasource/directory-repository'),require('../datasource/task-repository')).as(require('../interactor/create-task'));
_defaultContainer.registerWithTypes(require('../datasource/task-repository')).as(require('../interactor/delete-task'));
_defaultContainer.registerWithTypes(require('../datasource/task-repository')).as(require('../interactor/get-tasks'));
_defaultContainer.registerWithTypes(require('../datasource/task-repository')).as(require('../interactor/update-task'));
_defaultContainer.registerWithTypes(require('../datasource/user-repository')).as(require('../interactor/update-user'));
_defaultContainer.registerWithTypes(require('../datasource/user-repository')).as(require('../interactor/authenticate-user'));
_defaultContainer.registerWithTypes(require('../datasource/user-repository')).as(require('../interactor/register-user'));

module.exports = {
  resolve: function(type, container) {
    this._container = container !== undefined ? container : _defaultContainer;
    return this._container.resolve(type);
  }
}
