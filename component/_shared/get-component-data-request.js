"use strict";

module.exports = class GetComponentDataRequest {
  constructor(entityId, entityType, queryParams) {
    this.EntityId = entityId;
    this.EntityType = entityType;
    this.QueryParams = queryParams;
  }
}
