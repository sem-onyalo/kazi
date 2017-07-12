"use strict";

module.exports = class Component {
  constructor(id, key, name, taskId, directoryId, associationId) {
    this.Id = id;
    this.Key = key;
    this.Name = name;
    this.TaskId = taskId;
    this.DirectoryId = directoryId;
    this.AssociationId = associationId;
  }
}
