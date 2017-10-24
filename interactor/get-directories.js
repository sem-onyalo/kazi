"use strict";

module.exports = class GetDirectories {
  constructor(directoryRepository) {
    this._directoryRepository = directoryRepository;
  }

  async execute(getDirectoresRequest) {
    if (getDirectoresRequest.IsUserSession) {
      return await this._directoryRepository.getByAssociationId(getDirectoresRequest.AssociationId);
    } else {
      return await this._directoryRepository.getPublicByAssociationId(getDirectoresRequest.AssociationId);
    }
  }
}
