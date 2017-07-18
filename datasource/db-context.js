"use strict";

const pg = require('pg');
const url = require('url');

const dbparams = url.parse(process.env.DATABASE_URL);
const dbauth = dbparams.auth.split(':');

const connPool = new pg.Pool({
  user: dbauth[0],
  password: dbauth[1],
  host: dbparams.hostname,
  port: dbparams.port,
  database: dbparams.pathname.split('/')[1],
  ssl: true,
  max: 10,
  idleTimeoutMillis: 30000
});

connPool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack);
});

module.exports = {
  ping: function(cb) {
    connPool.query('select current_date;', (err, res) => {
      if (err) {
        console.error(err.message);
        cb(false);
      } else {
        console.log('Ping to database successful');
        cb(true);
      }
    });
  }
}
