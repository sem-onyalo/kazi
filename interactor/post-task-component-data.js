"use strict";

const ComponentsManager = require('../component/_shared/components-manager');
const Constants = require('../util/constants');
const PostComponentDataRequest = require('../component/_shared/post-component-data-request');
const PostTaskComponentDataResponse = require('./model/post-task-component-data-response');

module.exports = class PostTaskComponentData {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  /**
   * Execute the interactor.
   * @name execute
   * @param {Interactor.Model.PostTaskComponentDataRequest} request - The request object.
   * @returns {Interactor.Model.PostTaskComponentDataResponse}
   */
  async execute(request) {
    let component = await this._componentRepository.getById(request.ComponentId);
    let interactor = ComponentsManager.getInteractorByKey(component.Key);
    let postDataRequest = new PostComponentDataRequest(request.TaskId, Constants.EntityType.TASK, request.DisplayType, request.Data);
    let postDataResponse = await interactor.postData(postDataRequest);
    let response = new PostTaskComponentDataResponse(request.TaskId, request.ComponentId, postDataResponse.Data);
    return response;
  }
}
