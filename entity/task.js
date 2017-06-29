"use strict";

module.exports = class Task {
  constructor(id, name, directoryId, directoryKey, directoryName) {
    this.Id = id;
    this.Name = name;
    this.DirectoryId = directoryId;
    this.DirectoryKey = directoryKey;
    this.DirectoryName = directoryName;
  }
}
