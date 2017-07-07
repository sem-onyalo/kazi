"use strict";

module.exports = class DeleteTask {
  constructor(taskRepository) {
    this._taskRepository = taskRepository;
  }

  execute(deleteTaskRequest) {
    let result = this._taskRepository.delete(deleteTaskRequest.TaskId);
    if (!result) throw 'There was an error deleting the task or the task does not exist';
  }
}
