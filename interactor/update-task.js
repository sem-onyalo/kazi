"use strict";

module.exports = class UpdateTask {
  constructor(taskRepository) {
    this._taskRepository = taskRepository;
  }

  execute(updateTaskRequest) {
    if (updateTaskRequest.TaskName === '' || updateTaskRequest.TaskName === null || updateTaskRequest.TaskName === undefined)
      throw 'The task name cannot be empty';

    let task = this._taskRepository.getById(updateTaskRequest.TaskId);
    if (task === null) throw 'The specified task does not exist';

    task.Name = updateTaskRequest.TaskName;
    return this._taskRepository.update(task);
  }
}
