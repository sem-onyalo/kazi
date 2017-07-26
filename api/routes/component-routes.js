"use strict";

const DependencyFactory = require('../../factory/dependency-factory');
const GetComponentsInteractor = require('../../interactor/get-components');

module.exports = function(app) {
  app.route('/components')
    .get(async (req, res) => {
      try {
        let getComponents = DependencyFactory.resolve(GetComponentsInteractor);
        let components = await getComponents.execute();
        res.json(components);
      } catch (ex) {
        res.json({ error: ex });
      }
    });
}
