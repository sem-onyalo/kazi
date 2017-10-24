"use strict";

module.exports = class GetDirectoriesRequest {
  constructor(isUserSession, associationId) {
    this.IsUserSession = isUserSession;
    this.AssociationId = associationId;
  }
}
