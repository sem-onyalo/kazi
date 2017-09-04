"use strict";

const ComponentsManager = require('../component/_shared/components-manager');
const Constants = require('../util/constants');
const PostComponentDataRequest = require('../component/_shared/post-component-data-request');
const PostDirectoryComponentDataResponse = require('./model/post-directory-component-data-response');

module.exports = class PostDirectoryComponentData {
  constructor(componentRepository) {
    this._componentRepository = componentRepository;
  }

  /**
   * Execute the interactor.
   * @name execute
   * @param {Interactor.Model.PostDirectoryComponentDataRequest} request - The request object.
   * @returns {Interactor.Model.PostDirectoryComponentDataResponse}
   */
  async execute(request) {
    let interactor = ComponentsManager.getInteractorByKey(request.ComponentKey);
    let postDataRequest = new PostComponentDataRequest(request.DirectoryId, Constants.EntityType.DIRECTORY, undefined, request.ComponentData);
    let postDataResponse = await interactor.postData(postDataRequest);
    let response = new PostDirectoryComponentDataResponse(request.DirectoryId, request.ComponentKey, postDataResponse.Data);
    return response;
  }
}
