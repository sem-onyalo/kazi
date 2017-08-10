"use strict";

module.exports = class PostComponentDataResponse {
  constructor(entityId, entityType, data) {
    this.EntityId = entityId;
    this.EntityType = entityType;
    this.Data = data;
  }
}
