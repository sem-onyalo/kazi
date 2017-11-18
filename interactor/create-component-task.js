"use strict";

module.exports = class CreateComponentTask {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  async execute(createComponentTaskRequest) {
    let rowsAffected = await this._componentRepository.addToTask(createComponentTaskRequest.ComponentId, createComponentTaskRequest.TaskId);
    if (rowsAffected === 0) throw 'There was an error adding the component to the task or the component or task does not exist';
    let component = await this._componentRepository.getByComponentIdAndTaskId(createComponentTaskRequest.ComponentId, createComponentTaskRequest.TaskId);
    return component;
  }
}
