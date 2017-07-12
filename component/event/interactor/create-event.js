"use strict";

const Event = require('../entity/event');

module.exports = class CreateEvent {
  constructor(eventRepository) {
    this._eventRepository = eventRepository;
  }

  execute(createEventRequest) {
    let event = new Event(0, createEventRequest.EntityId, createEventRequest.EventDateTime);
    event = this._eventRepository.create(event);
    if (event == null) throw 'There was an error creating the event or the entity does not exist';
  }
}
