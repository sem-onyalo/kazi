"use strict";

const Shared = require('../../../_shared');

module.exports = class GetEventRequest extends Shared.ComponentRequest {
  constructor(entityId, entityType, displayType) {
    super(entityId, entityType, displayType);
  }
}
