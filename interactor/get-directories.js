"use strict";

module.exports = class GetDirectories {
  constructor(directoryRepository) {
    this._directoryRepository = directoryRepository;
  }

  execute(getDirectoresRequest) {
    return this._directoryRepository.getByAssociationId(getDirectoresRequest.AssociationId);
  }
}
