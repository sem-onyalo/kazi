"use strict";

module.exports = {
  ComponentDisplayType: {
    NONE: 0,
    TASK_ADDON: 1,
    TASK_INLINE: 2,
    TASK_LIST: 3
  },
  EntityType: {
    NONE: 0,
    TASK: 1,
    DIRECTORY: 2,
    ASSOCIATION: 3
  },
  REGEX_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  USER_AUTH_TOKEN_LENGTH: 64
}
