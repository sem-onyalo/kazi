"use strict";

module.exports = class PostDirectoryComponentDataResponse {
  constructor(directoryId, componentKey, data) {
    this.DirectoryId = directoryId;
    this.ComponentKey = componentKey;
    this.ComponentData = data;
  }
}
