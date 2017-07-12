"use strict";

module.exports = class CreateComponentDirectory {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  execute(createComponentDirectoryRequest) {
    let component = this._componentRepository.addToDirectory(createComponentDirectoryRequest.ComponentId, createComponentDirectoryRequest.DirectoryId);
    if (component == null) throw 'There was an error adding the component to the directory or the component or directory does not exist';
    return component;
  }
}
