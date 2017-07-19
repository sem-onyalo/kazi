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
  ping: async function() {
    try {
      let result = await connPool.query('select current_date');
      return true;
    } catch (ex) {
      console.error(ex);
      return false;
    }
  },

  query: async function(text, params) {
    try {
      return await connPool.query(text, params);
    } catch (ex) {
      console.error(ex);
      return null;
    }
  }
}
