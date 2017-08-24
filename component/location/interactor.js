"use strict";

const Constants = require('../../util/constants');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const Location = require('./location');
const PostComponentDataResponse = require('../_shared/post-component-data-response');
const Repository = require('./repository');

module.exports = {
  getData: async (request) => {
    let response = new GetComponentDataResponse(request.EntityId, request.EntityType);

    switch (request.EntityType) {
      case Constants.EntityType.TASK:
        response.DataObject = await Repository.getLocation(request.EntityId);
        break;

      case Constants.EntityType.DIRECTORY:
        response.DataObject = [];
        break;

      default:
        response.DataObject = { error: 'Unsupported action' };
        break;
    }

    return response;
  },

  postData: async (request) => {
    let location = await Repository.getLocation(request.EntityId);
    if (location) {
      location.Location = request.Data.Location;
      await Repository.updateLocation(location);
    } else {
      location = new Location(request.EntityId, request.Data.Location);
      await Repository.saveLocation(location);
      location = await Repository.getLocation(request.EntityId);
    }

    let response = new PostComponentDataResponse(request.EntityId, request.EntityType, location);
    return response;
  }
}
