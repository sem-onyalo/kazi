"use strict";

module.exports = class GetDirectoryComponentDataResponse {
  constructor(directoryId, data) {
    this.DirectoryId = directoryId;
    this.ComponentData = data;
  }
}
