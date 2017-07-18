const associationRoutes = require('./association-routes');
const defaultRoutes = require('./default-routes');
const directoryRoutes = require('./directory-routes');
const taskRoutes = require('./task-routes');

module.exports = function(app) {
  associationRoutes(app);
  defaultRoutes(app);
  directoryRoutes(app);
  taskRoutes(app);
}