const associationRoutes = require('./association-routes');
const componentRoutes = require('./component-routes');
const cors = require('cors');
const Datasource = require('../../datasource');
const defaultRoutes = require('./default-routes');
const DependencyFactory = require('../../factory/dependency-factory');
const directoryRoutes = require('./directory-routes');
const session = require('express-session');
const taskRoutes = require('./task-routes');
const userRoutes = require('./user-routes');

const openPaths = ['/', '/ping', '/users/authenticate', '/users/register'];

module.exports = function(app) {
  app.use(cors({ origin: ['http://localhost', 'http://semonyalo.com'], credentials: true }));
  app.options('*', cors());
  app.use(session({
    secret: 'sde5dB8Qiswn^2skKliOpwF647Df!FFus30F*rr27',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));
  app.use(authorizeRequest);
  associationRoutes(app);
  componentRoutes(app);
  defaultRoutes(app);
  directoryRoutes(app);
  taskRoutes(app);
  userRoutes(app);

  app.use((req, res) => {
    res.status(400).send({ error: req.originalUrl + ' not found' });
  });
}

async function authorizeRequest(req, res, next) {
  if (openPaths.indexOf(req.path) < 0) {
    if (req.session && req.session.user) {
      let userRepository = DependencyFactory.resolve(Datasource.UserRepository);
      let user = await userRepository.getByUsername(req.session.user.Username);
      if (user) {
        delete user.Password;
        req.session.user = user;
      } else {
        return res.status(401).send('Authorization Required');
      }
    } else {
      return res.status(401).send('Authorization Required');
    }
  }

  next();
}
