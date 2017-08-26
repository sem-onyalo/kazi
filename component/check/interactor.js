"use strict";

const Check = require('./check');
const Constants = require('../../util/constants');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const PostComponentDataResponse = require('../_shared/post-component-data-response');
const Repository = require('./repository');

module.exports = {
  getData: async (request) => {
    let response = new GetComponentDataResponse(request.EntityId, request.EntityType);

    switch (request.EntityType) {
      case Constants.EntityType.TASK:
        response.DataObject = await Repository.getByTaskId(request.EntityId);
        break;

      case Constants.EntityType.DIRECTORY:
        response.DataObject = await Repository.getByDirectoryId(request.EntityId);
        break;

      default:
        response.DataObject = { error: 'Unsupported action' };
        break;
    }

    return response;
  },

  postData: async (request) => {
    let check = await Repository.getByTaskId(request.EntityId);
    if (check) {
      check.IsChecked = request.Data.IsChecked;
      check.UserId = request.Data.UserId;
      await Repository.updateCheck(check);
    } else {
      check = new Check(request.EntityId);
      check.IsChecked = request.Data.IsChecked;
      check.UserId = request.Data.UserId;
      await Repository.saveCheck(check);
    }

    check = await Repository.getByTaskId(request.EntityId);
    let response = new PostComponentDataResponse(request.EntityId, request.EntityType, check);
    return response;
  }
}
