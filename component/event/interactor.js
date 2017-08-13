"use strict";

const Repository = require('./repository');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const Event = require('./event');
const PostComponentDataResponse = require('../_shared/post-component-data-response');

module.exports = {
  getData: async (request) => {
    let response = new GetComponentDataResponse(request.EntityId, request.EntityType);
    response.DataObject = await Repository.getEvent(request.EntityId);
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
