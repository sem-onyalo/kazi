"use strict";

const ComponentsManager = require('../component/_shared/components-manager');
const Constants = require('../util/constants');
const GetComponentDataRequest = require('../component/_shared/get-component-data-request');
const GetDirectoryComponentsDataResponse = require('./model/get-directory-components-data-response');

module.exports = class GetDirectoryComponentsData {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  /**
   * Execute the interactor.
   * @name execute
   * @param {Interactor.Model.GetDirectoryComponentsDataRequest} request - The request object.
   * @returns {Interactor.Model.GetDirectoryComponentsDataResponse}
   */
  async execute(request) {
    let response = new GetDirectoryComponentsDataResponse(request.DirectoryId);
    let components = await this._componentRepository.getByDirectoryId(request.DirectoryId);

    for (let i = 0; i < components.length; i++) {
      let interactor = ComponentsManager.getInteractorByKey(components[i].Key);
      if (interactor) {
        let getDataRequest = new GetComponentDataRequest(request.DirectoryId, Constants.EntityType.DIRECTORY, request.DisplayType);
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
