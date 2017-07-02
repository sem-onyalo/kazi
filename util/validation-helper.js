"use strict";

module.exports = {
  stringNotNullOrEmpty: function (value, errorMessage) {
    if (value === null || value === undefined || value === '')
      throw errorMessage;
  }
}
