"use strict";

module.exports = class GetComponentDataRequest {
  constructor(entityId, entityType, displayType) {
    this.EntityId = entityId;
    this.EntityType = entityType;
    this.DisplayType = displayType;
  }
}
