"use strict";

const DeleteDirectoryRequest = require('./model/delete-directory-request');

module.exports = class DeleteDirectory {
  constructor(directoryRepository) {
    this._directoryRepository = directoryRepository;
  }

  execute(deleteDirectoryRequest) {
    let result = this._directoryRepository.delete(deleteDirectoryRequest.DirectoryId);
    if (!result) throw 'There was an error deleting the directory or the directory does not exist';
  }
}
