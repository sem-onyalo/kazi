"use strict";

const Entity = require('../entity');
const UpdateDirectoryRequest = require('./model/update-directory-request');
const UrlHelper = require('../util/url-helper');
const ValidationHelper = require('../util/validation-helper');

module.exports = class UpdateDirectory {
  constructor(directoryRepository) {
    this._directoryRepository = directoryRepository;
  }

  execute(updateDirectoryRequest) {
    ValidationHelper.stringNotNullOrEmpty(updateDirectoryRequest.DirectoryName, 'The directory name cannot be empty');

    let directoryKey = UrlHelper.makeUrlFriendly(updateDirectoryRequest.DirectoryName);
    let directory = new Entity.Directory(updateDirectoryRequest.DirectoryId, updateDirectoryRequest.AssociationId, updateDirectoryRequest.ParentId, directoryKey, updateDirectoryRequest.DirectoryName);

    let updatedDirectory = this._directoryRepository.update(directory);
    if (updatedDirectory == null) throw 'There was an error updating the directory or the directory does not exist';

    return updatedDirectory;
  }
}
