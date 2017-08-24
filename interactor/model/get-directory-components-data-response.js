"use strict";

module.exports = class GetDirectoryComponentsDataResponse {
  constructor(directoryId) {
    this.DirectoryId = directoryId;
    this.ComponentsData = [];
  }
}
