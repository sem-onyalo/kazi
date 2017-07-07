"use strict";

module.exports = class SetupAssociationRequest {
  constructor(associationName, associationAlias, defaultDirectoryName, adminFirstName, adminLastName, adminUsername, adminPassword) {
    this.AssociationName = associationName;
    this.AssociationAlias = associationAlias;
    this.DefaultDirectoryName = defaultDirectoryName;
    this.AdminFirstName = adminFirstName;
    this.AdminLastName = adminLastName;
    this.AdminUsername = adminUsername;
    this.AdminPassword = adminPassword;
  }
}
