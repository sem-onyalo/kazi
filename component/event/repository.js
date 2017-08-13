"use strict";

const DependencyFactory = require('../../factory/dependency-factory');
const Event = require('./event');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

module.exports = {
  getEvent: async (taskId) => {
    let text = 'select task_id, event_date, event_time from component_event '
      + 'where task_id = $1';
    let params = [taskId];
    let result = await _dbContext.query(text, params);

    let entity = null;
    if (result && result.rows.length > 0) {
      entity = new Event(result.rows[0].task_id, result.rows[0].event_date, result.rows[0].event_time);
    }

    return entity;
  },

  saveEvent: async (event) => {
    let text = 'insert into component_event (task_id, event_date, event_time) '
      + 'values ($1, $2, $3)';
    let params = [event.TaskId, event.EventDate, event.EventTime];
    let result = await _dbContext.query(text, params);
    return result.rowCount;
  },

  updateEvent: async (event) => {
    let text = 'update component_event set event_date = $2, event_time = $3 '
      + 'where task_id = $1';
    let params = [event.TaskId, event.EventDate, event.EventTime];
    let result = await _dbContext.query(text, params);
    return result.rowCount;
  }
}
