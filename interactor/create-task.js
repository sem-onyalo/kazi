"use strict";

const Entity = require('../entity');
const ValidationHelper = require('../util/validation-helper');

module.exports = class CreateTask {
  constructor(directoryRepository, taskRepository) {
    this._directoryRepository = directoryRepository;
    this._taskRepository = taskRepository;
  }

  async execute(createTaskRequest) {
    ValidationHelper.stringNotNullOrEmpty(createTaskRequest.Name, 'The task name cannot be empty');

    let dir = await this._directoryRepository.getById(createTaskRequest.DirectoryId);
    if (dir == null) throw 'The specified directory does not exist';

    let task = new Entity.Task(0, createTaskRequest.Name, createTaskRequest.DirectoryId);
    return await this._taskRepository.create(task);
  }
}
