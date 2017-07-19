"use strict";

module.exports = class GetDirectories {
  constructor(directoryRepository) {
    this._directoryRepository = directoryRepository;
  }

  async execute(getDirectoresRequest) {
    return await this._directoryRepository.getByAssociationId(getDirectoresRequest.AssociationId);
  }
}
