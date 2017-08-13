"use strict";

const DependencyFactory = require('../../factory/dependency-factory');
const Location = require('./location');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

module.exports = {
  getLocation: async (taskId) => {
    let text = 'select task_id, location from component_location '
      + 'where task_id = $1';
    let params = [taskId];
    let result = await _dbContext.query(text, params);

    let entity = null;
    if (result && result.rows.length > 0) {
      entity = new Location(result.rows[0].task_id, result.rows[0].location);
    }

    return entity;
  },

  saveLocation: async (location) => {
    let text = 'insert into component_location (task_id, location) '
      + 'values ($1, $2)';
    let params = [location.TaskId, location.Location];
    let result = await _dbContext.query(text, params);
    return result.rowCount;
  },

  updateLocation: async (location) => {
    let text = 'update component_location set location = $2 '
      + 'where task_id = $1';
    let params = [location.TaskId, location.Location];
    let result = await _dbContext.query(text, params);
    return result.rowCount;
  }
}
