"use strict";

module.exports = class GetTasks {
  constructor(taskRepository) {
    this._taskRepository = taskRepository;
  }

  async execute(getTasksRequest) {
    if (getTasksRequest.IsUserSession) {
      return await this._taskRepository.getByDirectoryId(getTasksRequest.DirectoryId);
    } else {
      return await this._taskRepository.getPublicByDirectoryId(getTasksRequest.DirectoryId);
    }
  }
}
