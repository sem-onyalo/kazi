"use strict";

module.exports = class VolunteerItem {
  constructor(directoryId, itemId, itemName) {
    this.DirectoryId = directoryId;
    this.ItemId = itemId;
    this.ItemName = itemName;
  }
}
