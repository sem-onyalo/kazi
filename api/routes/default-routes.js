"use strict";

const DbContext = require('../../datasource/db-context');

module.exports = function(app) {
  app.route('/')
    .get((req, res) => {
      res.json('Kazi API');
    });

  app.route('/ping')
    .get((req, res) => {
      DbContext.ping((result) => {
        res.json('Database ping success is: ' + result.toString());
      });
    });
}
