"use strict";

module.exports = class CreateComponentRequest {
  constructor(entityId, entityType, displayType) {
    this.EntityId = entityId;
    this.EntityType = entityType;
    this.DisplayType = displayType;
  }
}
