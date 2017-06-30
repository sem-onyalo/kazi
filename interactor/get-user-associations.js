"use strict";

module.exports = class GetUserAssociations {
  constructor(associationRepository) {
    this._associationRepository = associationRepository;
  }

  execute(getUserAssociationsRequest) {
    return this._associationRepository.getByUserId(getUserAssociationsRequest.UserId);
  }
}
