"use strict";

const ComponentsManager = require('../component/_shared/components-manager');
const Constants = require('../util/constants');
const GetComponentDataRequest = require('../component/_shared/get-component-data-request');
const GetTaskComponentDataResponse = require('./model/get-task-component-data-response');

module.exports = class GetTaskComponentData {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  /**
   * Execute the interactor.
   * @name execute
   * @param {Interactor.Model.GetTaskComponentDataRequest} request - The request object.
   * @returns {Interactor.Model.GetTaskComponentDataResponse}
   */
  async execute(request) {
    let response = new GetTaskComponentDataResponse(request.TaskId, request.ComponentId);
    let component = await this._componentRepository.getById(request.ComponentId);
    let interactor = ComponentsManager.getInteractorByKey(component.Key);

    if (interactor) {
      let getDataRequest = new GetComponentDataRequest(request.TaskId, Constants.EntityType.TASK, request.QueryParams);
      let getDataResponse = await interactor.getData(getDataRequest);
      response.ComponentData = getDataResponse.DataObject;
    }

    return response;
  }
}
