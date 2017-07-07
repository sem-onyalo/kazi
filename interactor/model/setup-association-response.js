"use strict";

module.exports = class SetupAssociationResponse {
  constructor(association, directory, user) {
    this.Association = association;
    this.Directory = directory;
    this.User = user;
  }
}
