"use strict";

const crypto = require('crypto');
const bcrypt = require('bcrypt-as-promised');

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

var _sessionUser;

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
  },

  hashPassword: async (password) => {
    return await bcrypt.hash(password, 10);
  },

  comparePassword: async (actual, expected) => {
    try {
      return await bcrypt.compare(actual, expected);
    } catch (ex) {
      console.log('compare password exception: ' + ex.message);
      return false;
    }
  },

  getSessionUser: () => {
    return _sessionUser;
  },

  setSessionUser: (user) => {
    _sessionUser = user;
  }
}
