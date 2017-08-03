"use strict";

module.exports = class GetComponentDataResponse {
  constructor(entityId, entityType) {
    this.EntityId = entityId;
    this.EntityType = entityType;
    this.DataObject = { };
  }
}
