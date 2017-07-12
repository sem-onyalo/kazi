"use strict";

const Shared = require('../../../_shared');

module.exports = class CreateEventRequest extends Shared.ComponentRequest {
  constructor(entityId, entityType, eventDateTime) {
    super(entityId, entityType);
    this.EventDateTime = eventDateTime;
  }
}
