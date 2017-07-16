const express = require('express'),
  app = express(),
  port = process.env.PORT || 8000,
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('./api/routes')(app);

app.listen(port, () => {
  console.log('Kazi API server live on: ' + port);
});
