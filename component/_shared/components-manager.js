"use strict";

module.exports = {
  getInteractorByKey: (key) => {
    try {
      return require('../' + key + '/interactor');
    } catch (ex) {
      return undefined;
    }
  }
}
