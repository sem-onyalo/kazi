"use strict";

module.exports = class CreateDirectory {
  constructor(associationRepository, directoryRepository) {
    this._associationRepository = associationRepository;
    this._directoryRepository = directoryRepository;
  }

  execute(createDirectoryRequest) {
    let association = this._associationRepository.getById(createDirectoryRequest.AssociationId);

    if (association === null) throw 'The specified association does not exist';

    this._directoryRepository.getById(createDirectoryRequest.ParentId);
  }
}
