"use strict";

module.exports = {
  makeUrlFriendly: function(value) {
    return value !== null && value !== undefined && value.trim() !== ''
      ? value.trim().toLowerCase().replace(/[^a-z0-9_]+/, '-') : '';
  }
}
