"use strict";

module.exports = {
  makeUrlFriendly: function(value) {
    return value && value.trim() !== '' ? value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
  }
}
