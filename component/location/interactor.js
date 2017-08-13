"use strict";

const Repository = require('./repository');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const Location = require('./location');
const PostComponentDataResponse = require('../_shared/post-component-data-response');

module.exports = {
  getData: async (request) => {
    let response = new GetComponentDataResponse(request.EntityId, request.EntityType);
    response.DataObject = await Repository.getLocation(request.EntityId);
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
