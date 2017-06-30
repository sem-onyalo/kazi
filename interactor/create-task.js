"use strict";

const Entity = require('../entity');

module.exports = class CreateTask {
  constructor(directoryRepository, taskRepository) {
    this._directoryRepository = directoryRepository;
    this._taskRepository = taskRepository;
  }

  execute(createTaskRequest) {
    let dir = this._directoryRepository.getById(createTaskRequest.DirectoryId);
    if (dir == null) throw 'The specified directory does not exist';

    let task = new Entity.Task(0, createTaskRequest.Name);
    return this._taskRepository.create(task);
  }
}
