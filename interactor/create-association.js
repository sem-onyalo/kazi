"use strict";

const Entity = require('../entity');
const UrlHelper = require('../util/url-helper');

module.exports = class CreateAssociation {
  constructor(associationRepository) {
    this._associationRepository = associationRepository;
  }

  execute(createAssociationRequest) {
    let key = UrlHelper.makeUrlFriendly(createAssociationRequest.Name);
    let association = this._associationRepository.getByKey(key);

    if (association == null) {
      association = new Entity.Association(0, key, createAssociationRequest.Name, createAssociationRequest.Alias);
    } else {
      throw 'An association with that name already exists';
    }

    return this._associationRepository.create(association);
  }
}
