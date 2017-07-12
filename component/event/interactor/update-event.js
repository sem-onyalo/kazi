"use strict";

const Event = require('../entity/event');

module.exports = class UpdateEvent {
  constructor(eventRepository) {
    this._eventRepository = eventRepository;
  }

  execute(updateEventRequest) {
    let event = new Event(0, updateEventRequest.EntityId, updateEventRequest.EventDateTime);
    event = this._eventRepository.update(event);
    if (event == null) throw 'There was an error updating the event or the entity does not exist';
  }
}
