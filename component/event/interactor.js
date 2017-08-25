"use strict";

const Constants = require('../../util/constants');
const Event = require('./event');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const PostComponentDataResponse = require('../_shared/post-component-data-response');
const Repository = require('./repository');

module.exports = {
  getData: async (request) => {
    let response = new GetComponentDataResponse(request.EntityId, request.EntityType);

    switch (request.EntityType) {
      case Constants.EntityType.TASK:
        response.DataObject = await Repository.getEvent(request.EntityId);
        break;

      case Constants.EntityType.DIRECTORY:
        response.DataObject = undefined;
        break;

      default:
        response.DataObject = { error: 'Unsupported action' };
        break;
    }

    return response;
  },

  postData: async (request) => {
    let event = await Repository.getEvent(request.EntityId);
    if (event) {
      event.EventDate = request.Data.EventDate;
      event.EventTime = request.Data.EventTime;
      await Repository.updateEvent(event);
    } else {
      event = new Event(request.EntityId, request.Data.EventDate, request.Data.EventTime);
      await Repository.saveEvent(event);
    }

    let response = new PostComponentDataResponse(request.EntityId, request.EntityType, event);
    return response;
  }
}
