"use strict";

const Entity = require('../entity');
const UrlHelper = require('../util/url-helper');
const ValidationHelper = require('../util/validation-helper');

module.exports = class CreateDirectory {
  constructor(associationRepository, directoryRepository) {
    this._associationRepository = associationRepository;
    this._directoryRepository = directoryRepository;
  }

  execute(createDirectoryRequest) {
    ValidationHelper.stringNotNullOrEmpty(createDirectoryRequest.Name, 'The directory name cannot be empty');

    let association = this._associationRepository.getById(createDirectoryRequest.AssociationId);
    if (association === null) throw 'The specified association does not exist';

    let parentDir = this._directoryRepository.getById(createDirectoryRequest.ParentId);
    if (parentDir === null) throw 'The specified parent directory does not exist';

    let key = UrlHelper.makeUrlFriendly(createDirectoryRequest.Name);
    let dir = this._directoryRepository.getByKey(key);
    if (dir !== null) throw 'The specified directory already exists';

    dir = new Entity.Directory(0, createDirectoryRequest.AssociationId, createDirectoryRequest.ParentId, key, createDirectoryRequest.Name);
    return this._directoryRepository.create(dir);
  }
}
