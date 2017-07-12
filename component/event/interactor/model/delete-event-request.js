"use strict";

const Shared = require('../../../_shared');

module.exports = class DeleteEventRequest extends Shared.ComponentRequest {
  constructor(entityId, entityType) {
    super(entityId, entityType);
  }
}
