const itemRoutes = requier('./item-routes');
// const itemRepository = require('../ds/item-repository');

module.exports = functoin (server) {
  server.use('/item', itemRoutes);
}
