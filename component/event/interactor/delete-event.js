"use strict";

module.exports = class DeleteEvent {
  constructor(eventRepository) {
    this._eventRepository = eventRepository;
  }

  execute(deleteEventRequest) {
    this._eventRepository.deleteByEntityIdAndEntityType(deleteEventRequest.EntityId, deleteEventRequest.EntityType);
  }
}
