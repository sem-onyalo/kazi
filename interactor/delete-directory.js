"use strict";

const DeleteDirectoryRequest = require('./model/delete-directory-request');

module.exports = class DeleteDirectory {
  constructor(directoryRepository) {
    this._directoryRepository = directoryRepository;
  }

  async execute(deleteDirectoryRequest) {
    let result = await this._directoryRepository.delete(deleteDirectoryRequest.DirectoryId);
    if (result === 0) throw 'There was an error deleting the directory or the directory does not exist';
  }
}
