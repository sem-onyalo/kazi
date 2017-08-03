"use strict";

const ComponentsManager = require('../component/_shared/components-manager');
const Constants = require('../util/constants');
const GetComponentDataRequest = require('../component/_shared/get-component-data-request');
const GetTaskComponentsDataResponse = require('./model/get-task-components-data-response');

module.exports = class GetTaskComponentData {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  /**
   * Execute the interactor.
   * @name execute
   * @param {Interactor.Model.GetTaskComponentsDataRequest} request - The request object.
   * @returns {Interactor.Model.GetTaskComponentsDataResponse}
   */
  async execute(request) {
    let response = new GetTaskComponentsDataResponse(request.TaskId);
    let components = await this._componentRepository.getByTaskId(request.TaskId);

    for (let i = 0; i < components.length; i++) {
      let interactor = ComponentsManager.getInteractorByKey(components[i].Key);
      if (interactor) {
        let getDataRequest = new GetComponentDataRequest(request.TaskId, Constants.EntityType.TASK, request.DisplayType);
        let getDataResponse = await interactor.getData(getDataRequest);
        response.ComponentsData.push({
          id: components[i].Id,
          key: components[i].Key,
          data: getDataResponse.DataObject
        });
      }
    }

    return response;
  }
}
