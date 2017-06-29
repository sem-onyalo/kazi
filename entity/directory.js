"use strict";

module.exports = class Directory {
  constructor(id, associationId, parentId, key, name) {
    this.Id = id;
    this.AssociationId = associationId;
    this.ParentId = parentId;
    this.Key = key;
    this.Name = name;
  }
}
