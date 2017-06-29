const express = require('express');
const server = express();
const routes = require('./api/routes');
const port = 8000;

server.listen(port, () => {
  console.log('We are live on ' + port);
}
