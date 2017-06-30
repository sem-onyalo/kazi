"use strict";

module.exports = class CreateTaskRequest {
  constructor(directoryId, name) {
    this.DirectoryId = directoryId;
    this.Name = name;
  }
}
