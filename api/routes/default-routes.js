"use strict";

const DbContext = require('../../datasource/db-context');

module.exports = function(app) {
  app.route('/')
    .get((req, res) => {
      res.json('Kazi API');
    });

  app.route('/ping')
    .get(async (req, res) => {
      let result = await DbContext.ping();
      res.json('Database ping success is: ' + result.toString());
    });
}
