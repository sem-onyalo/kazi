"use strict";

module.exports = {
  stringNotNullOrEmpty: function (value, errorMessage) {
    let result = (value === null || value === undefined || value === '');
    if (result && errorMessage !== null && errorMessage !== undefined && errorMessage !== '')
      throw errorMessage;

    return !result;
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
