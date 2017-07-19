"use strict";

const ValidationHelper = require('../util/validation-helper');

module.exports = class UpdateTask {
  constructor(taskRepository) {
    this._taskRepository = taskRepository;
  }

  async execute(updateTaskRequest) {
    ValidationHelper.stringNotNullOrEmpty(updateTaskRequest.TaskName, 'The task name cannot be empty');

    let task = await this._taskRepository.getById(updateTaskRequest.TaskId);
    if (task === null) throw 'The specified task does not exist';

    task.Name = updateTaskRequest.TaskName;
    return await this._taskRepository.update(task);
  }
}
