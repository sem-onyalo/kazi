"use strict";

const ComponentsManager = require('../component/_shared/components-manager');
const Constants = require('../util/constants');
const GetComponentDataRequest = require('../component/_shared/get-component-data-request');
const GetDirectoryComponentDataResponse = require('./model/get-directory-component-data-response');

module.exports = class GetDirectoryComponentData {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  /**
   * Execute the interactor.
   * @name execute
   * @param {Interactor.Model.GetDirectoryComponentDataRequest} request - The request object.
   * @returns {Interactor.Model.GetDirectoryComponentDataResponse}
   */
  async execute(request) {
    let interactor = ComponentsManager.getInteractorByKey(request.ComponentKey);
    let getDataRequest = new GetComponentDataRequest(request.DirectoryId, Constants.EntityType.DIRECTORY);
    let getDataResponse = await interactor.getData(getDataRequest);
    let componentData = getDataResponse.DataObject ? getDataResponse.DataObject : undefined;
    let response = new GetDirectoryComponentDataResponse(request.DirectoryId, componentData);
    return response;
  }
}
