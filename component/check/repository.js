"use strict";

const Check = require('./check');
const DependencyFactory = require('../../factory/dependency-factory');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

const _selectCheckSql = 'select t.id as task_id, u.id as usr_id, u.first_name, u.last_name '
  + ', coalesce(cc.is_checked, false) as is_checked '
  + 'from directory d '
  + 'inner join task t on t.directory_id = d.id ';

module.exports = {
  getByTaskId: async (taskId) => {
    let text = _selectCheckSql
      + 'inner join component_check cc on cc.task_id = t.id '
      + 'inner join usr u on u.id = cc.usr_id '
      + 'where t.id = $1';
    let params = [taskId];
    let result = await _dbContext.query(text, params);

    let entity = null;
    if (result && result.rows.length > 0) {
      entity = new Check(result.rows[0].task_id, result.rows[0].usr_id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].is_checked);
    }

    return entity;
  },

  getByDirectoryId: async (directoryId) => {
    let text = _selectCheckSql
      + 'left join component_check cc on cc.task_id = t.id '
      + 'left join usr u on u.id = cc.usr_id '
      + 'where d.id = $1 ';
    let params = [directoryId];
    let result = await _dbContext.query(text, params);

    let entities = [];
    if (result && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        entities.push(new Check(result.rows[i].task_id, result.rows[i].usr_id, result.rows[i].first_name, result.rows[i].last_name, result.rows[i].is_checked));
      }
    }

    return entities;
  },

  saveCheck: async (check) => {
    let text = 'insert into component_check (task_id, usr_id, is_checked) '
      + 'values ($1, $2, $3)';
    let params = [check.TaskId, check.UserId, check.IsChecked];
    let result = await _dbContext.query(text, params);
    return check;
  },

  updateCheck: async (check) => {
    let text = 'update component_check set usr_id = $2, is_checked = $3 '
      + 'where task_id = $1 ';
    let params = [check.TaskId, check.UserId, check.IsChecked];
    let result = await _dbContext.query(text, params);
    return check;
  }
}
