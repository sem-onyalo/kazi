"use strict";

module.exports = {
  getInteractorByKey: (key) => {
    try {
      return require('../' + key + '/interactor');
    } catch (ex) {
      console.log('Could not retrieve interactor for ' + key, ex);
      return undefined;
    }
  }
}
