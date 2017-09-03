"use strict";

module.exports = class GetDirectoryComponentDataRequest {
  constructor(directoryId, componentKey) {
    this.DirectoryId = directoryId;
    this.ComponentKey = componentKey;
  }
}
