"use strict";

module.exports = class GetTasksRequest {
  constructor(isUserSession, directoryId) {
    this.IsUserSession = isUserSession;
    this.DirectoryId = directoryId;
  }
}
