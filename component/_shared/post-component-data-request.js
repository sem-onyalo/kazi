"use strict";

module.exports = class PostComponentDataRequest {
  constructor(entityId, entityType, displayType, data) {
    this.EntityId = entityId;
    this.EntityType = entityType;
    this.DisplayType = displayType;
    this.Data = data;
  }
}
