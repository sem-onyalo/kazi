"use strict";

const Entity = require('../entity');
const UrlHelper = require('../util/url-helper');
const ValidationHelper = require('../util/validation-helper');

module.exports = class CreateAssociation {
  constructor(associationRepository) {
    this._associationRepository = associationRepository;
  }

  async execute(createAssociationRequest) {
    ValidationHelper.stringNotNullOrEmpty(createAssociationRequest.Name, 'The association name cannot be empty');

    let key = UrlHelper.makeUrlFriendly(createAssociationRequest.Name);
    let association = await this._associationRepository.getByKey(key);

    if (association == null) {
      association = new Entity.Association(0, key, createAssociationRequest.Name, createAssociationRequest.Alias);
    } else {
      throw 'An association with that name already exists';
    }

    association = await this._associationRepository.create(association);

    if (association === null) {
      throw 'The association could not be created';
    }

    return association;
  }
}
