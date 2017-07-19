"use strict";

const Entity = require('../entity');
const UrlHelper = require('../util/url-helper');
const ValidationHelper = require('../util/validation-helper');

module.exports = class CreateDirectory {
  constructor(associationRepository, directoryRepository) {
    this._associationRepository = associationRepository;
    this._directoryRepository = directoryRepository;
  }

  async execute(createDirectoryRequest) {
    ValidationHelper.stringNotNullOrEmpty(createDirectoryRequest.Name, 'The directory name cannot be empty');

    let association = await this._associationRepository.getById(createDirectoryRequest.AssociationId);
    if (association === null) throw 'The specified association does not exist';

    if (createDirectoryRequest.ParentId > 0) {
      let parentDir = await this._directoryRepository.getById(createDirectoryRequest.ParentId);
      if (parentDir === null) throw 'The specified parent directory does not exist';
    }

    let key = UrlHelper.makeUrlFriendly(createDirectoryRequest.Name);
    let dir = await this._directoryRepository.getByKeyAndAssociationId(key, createDirectoryRequest.AssociationId);
    if (dir !== null) throw 'The specified directory already exists';

    dir = new Entity.Directory(0, createDirectoryRequest.AssociationId, createDirectoryRequest.ParentId, key, createDirectoryRequest.Name);
    return await this._directoryRepository.create(dir);
  }
}
