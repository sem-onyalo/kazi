"use strict";

module.exports = class GetUserAssociations {
  constructor(associationRepository) {
    this._associationRepository = associationRepository;
  }

  async execute(getUserAssociationsRequest) {
    return await this._associationRepository.getByUserId(getUserAssociationsRequest.UserId);
  }
}
