"use strict";

const Shared = require('../../../_shared');

module.exports = class GetEventResponse extends Shared.ComponentResponse {
  constructor(entityId, entityType, eventDateTime) {
    super(entityId, entityType);
    this.EventDateTime = eventDateTime;
  }
}
