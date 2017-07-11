"use strict";

const crypto = require('crypto');

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

module.exports = {
  generateRandomString : function(length) {
    var randomBytes = crypto.randomBytes(length);
    var result = new Array(length);

    var cursor = 0;
    for (var i = 0; i < length; i++) {
      cursor += randomBytes[i];
      result[i] = chars[cursor % chars.length];
    }

    return result.join('');
  }
}
