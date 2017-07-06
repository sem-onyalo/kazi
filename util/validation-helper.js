"use strict";

module.exports = {
  stringNotNullOrEmpty: function (value, errorMessage) {
    if (value === null || value === undefined || value === '')
      throw errorMessage;
  },

  regexMatch: function(regex, value, errorMessage) {
    if (!regex.test(value))
      throw errorMessage;
  },

  existsInArray: function(array, value, errorMessage) {
    if (array.indexOf(value) == -1)
      throw errorMessage;
  }
}
