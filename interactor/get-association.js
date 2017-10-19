"use strict";

module.exports = class GetComponents {
    constructor(associationRepository) {
        this._associationRepository = associationRepository;
    }

    async execute(request) {
        if (request.AssociationKey && request.AssociationKey.trim() !== '') {
            if (request.isUserSession) {
                return await this._associationRepository.getByKey(request.AssociationKey);
            } else {
                return await this._associationRepository.getPublicByKey(request.AssociationKey);
            }
        }
    }
}
