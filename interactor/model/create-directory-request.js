"use strict";

module.exports = class CreateDirectoryRequest {
  constructor(name, parentId, associationId) {
    this.Name = name;
    this.ParentId = parentId;
    this.AssociationId = associationId;
  }
}
