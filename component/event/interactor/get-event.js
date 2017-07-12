"use strict";

const GetEventResponse = require('./model/get-event-response');

module.exports = class GetEvent {
  constructor(eventRepository) {
    this._eventRepository = eventRepository;
  }

  execute(getEventRequest) {
    let event = this._eventRepository.getByEntityIdAndEntityTypeAndDisplayType(
      getEventRequest.EntityId,
      getEventRequest.EntityType,
      getEventRequest.DisplayType);
      
    let eventDateTime = event !== null ? event.EventDateTime : '';
    let response = new GetEventResponse(getEventRequest.EntityId, getEventRequest.EntityType, eventDateTime);
    return response;
  }
}
