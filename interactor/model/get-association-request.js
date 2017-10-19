"use strict";

module.exports = class GetAssociationRequest {
  constructor(isUserSession) {
    this.IsUserSession = isUserSession;
    this.AssociationKey = undefined;
  }
}
