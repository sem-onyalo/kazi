"use strict";

module.exports = class UpdateDirectoryRequest {
  constructor(directoryId, directoryName, parentId, associationId) {
    this.DirectoryId = directoryId;
    this.DirectoryName = directoryName;
    this.ParentId = parentId;
    this.AssociationId = associationId;
  }
}
