"use strict";

const Attendance = require('./attendance');
const DependencyFactory = require('../../factory/dependency-factory');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

module.exports = {
  getAttendance: async (taskId) => {
    let text = 'select u.id as usr_id, u.first_name, u.last_name, coalesce(ca.is_attending, false) as is_attending from task t '
      + 'inner join directory d on d.id = t.directory_id '
      + 'inner join association a on a.id = d.association_id '
      + 'inner join association_usr au on au.association_id = a.id '
      + 'inner join usr u on u.id = au.usr_id '
      + 'left join component_attendance ca on ca.usr_id = au.usr_id '
      + 'where t.id = $1';
    let params = [taskId];
    let result = await _dbContext.query(text, params);

    let entities = [];
    if (result && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        entities.push(new Attendance(result.rows[i].usr_id, result.rows[i].first_name, result.rows[i].last_name, result.rows[i].is_attending));
      }
    }

    return entities;
  }
}
