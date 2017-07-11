"use strict";

module.exports = {
  REGEX_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  USER_AUTH_TOKEN_LENGTH: 64
}
