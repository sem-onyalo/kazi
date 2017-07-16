const associationRoutes = require('./association-routes');
const directoryRoutes = require('./directory-routes');
const taskRoutes = require('./task-routes');

module.exports = function(app) {
  associationRoutes(app);
  directoryRoutes(app);
  taskRoutes(app);
}
