"use strict";

module.exports = class GetComponents {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  async execute(request) {
    if (request.DirectoryId) {
      return await this._componentRepository.getRelationshipByDirectoryId(request.DirectoryId);
    } else {
      return await this._componentRepository.get();
    }
  }
}
