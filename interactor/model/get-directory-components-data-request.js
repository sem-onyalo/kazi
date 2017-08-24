"use strict";

module.exports = class GetDirectoryComponentsDataRequest {
  constructor(directoryId, displayType) {
    this.DirectoryId = directoryId;
    this.DisplayType = displayType;
  }
}
