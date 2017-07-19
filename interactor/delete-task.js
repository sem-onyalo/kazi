"use strict";

module.exports = class DeleteTask {
  constructor(taskRepository) {
    this._taskRepository = taskRepository;
  }

  async execute(deleteTaskRequest) {
    let result = await this._taskRepository.delete(deleteTaskRequest.TaskId);
    if (result === 0) throw 'There was an error deleting the task or the task does not exist';
  }
}
