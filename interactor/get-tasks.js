"use strict";

module.exports = class GetTasks {
  constructor(taskRepository) {
    this._taskRepository = taskRepository;
  }

  async execute(getTasksRequest) {
    return await this._taskRepository.getByDirectoryId(getTasksRequest.DirectoryId);
  }
}
