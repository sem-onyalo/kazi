"use strict";

const htmlencode = require('htmlencode');

module.exports = {
  htmlEncode: function (value) {
    return htmlencode.htmlEncode(value);
  }
}
