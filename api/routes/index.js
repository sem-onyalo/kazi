const associationRoutes = require('./association-routes');
const defaultRoutes = require('./default-routes');
const directoryRoutes = require('./directory-routes');
const taskRoutes = require('./task-routes');
const userRoutes = require('./user-routes');

const openPaths = ['/', '/ping'];

module.exports = function(app) {
  app.use(authorizeRequest);
  associationRoutes(app);
  defaultRoutes(app);
  directoryRoutes(app);
  taskRoutes(app);
  userRoutes(app);

  app.use((req, res) => {
    res.status(400).send({ error: req.originalUrl + ' not found' });
  });
}

function authorizeRequest(req, res, next) {
  if (openPaths.indexOf(req.path) < 0) {
    let auth = req.get('authorization');
    if (!auth) {
      return res.status(401).send('Authorization Required');
    } else if (auth !== 'Bearer sde5dB8Qiswn^2skKliOpwF647Df!FFus30F*rr27') {
      return res.status(401).send('Authorization Required');
    }
  }

  // TODO: figure out if CORS should be enabled globally like this (i.e. security)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  next();
}
