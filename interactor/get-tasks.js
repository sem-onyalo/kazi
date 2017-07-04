"use strict";

module.exports = class GetTasks {
  constructor(taskRepository) {
    this._taskRepository = taskRepository;
  }

  execute(getTasksRequest) {
    return this._taskRepository.getByDirectoryId(getTasksRequest.DirectoryId);
  }
}
