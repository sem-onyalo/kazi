"use strict";

module.exports = class Association {
  constructor(id, key, name, alias) {
    this.Id = id;
    this.Key = key;
    this.Name = name;
    this.Alias = alias;
  }
}
