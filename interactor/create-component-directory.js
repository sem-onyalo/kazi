"use strict";

module.exports = class CreateComponentDirectory {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  async execute(createComponentDirectoryRequest) {
    let rowsAffected = await this._componentRepository.addToDirectory(createComponentDirectoryRequest.ComponentId, createComponentDirectoryRequest.DirectoryId);
    if (rowsAffected === 0) throw 'There was an error adding the component to the directory or the component or directory does not exist';
  }
}
