"use strict";

module.exports = class PostDirectoryComponentDataRequest {
  constructor(directoryId, componentKey, data) {
    this.DirectoryId = directoryId;
    this.ComponentKey = componentKey;
    this.ComponentData = data;
  }
}
