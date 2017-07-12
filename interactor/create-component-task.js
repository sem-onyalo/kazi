"use strict";

module.exports = class CreateComponentTask {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  execute(createComponentTaskRequest) {
    let component = this._componentRepository.addToTask(createComponentTaskRequest.ComponentId, createComponentTaskRequest.TaskId);
    if (component == null) throw 'There was an error adding the component to the task or the component or task does not exist';
    return component;
  }
}
