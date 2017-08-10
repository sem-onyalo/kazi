"use strict";

const Attendance = require('./attendance');
const DependencyFactory = require('../../factory/dependency-factory');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

const _selectAttendanceSql = 'select t.id as task_id, u.id as usr_id, u.first_name, u.last_name '
  + ', coalesce(ca.is_attending, false) as is_attending '
  + 'from task t '
  + 'inner join directory d on d.id = t.directory_id '
  + 'inner join association a on a.id = d.association_id '
  + 'inner join association_usr au on au.association_id = a.id '
  + 'inner join usr u on u.id = au.usr_id ';

module.exports = {
  getAttendance: async (taskId) => {
    let text = _selectAttendanceSql
      + 'left join component_attendance ca on ca.usr_id = u.id and ca.task_id = t.id '
      + 'where t.id = $1';
    let params = [taskId];
    let result = await _dbContext.query(text, params);

    let entities = [];
    if (result && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        entities.push(new Attendance(result.rows[i].task_id, result.rows[i].usr_id, result.rows[i].first_name, result.rows[i].last_name, result.rows[i].is_attending));
      }
    }

    return entities;
  },

  getAttendanceByTaskIdAndUserId: async (taskId, userId) => {
    let text = _selectAttendanceSql
      + 'inner join component_attendance ca on ca.usr_id = u.id and ca.task_id = t.id '
      + 'where ca.task_id = $1 '
      + 'and ca.usr_id = $2 ';
    let params = [taskId, userId];
    let result = await _dbContext.query(text, params);

    let entity = null;
    if (result && result.rows.length > 0) {
      entity = new Attendance(result.rows[0].task_id, result.rows[0].usr_id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].is_attending);
    }

    return entity;
  },

  saveAttendance: async (attendance) => {
    let text = 'insert into component_attendance (task_id, usr_id, is_attending) '
      + 'values ($1, $2, $3) ';
    let params = [attendance.TaskId, attendance.UserId, attendance.IsAttending];
    let result = await _dbContext.query(text, params);
    return attendance;
  },

  updateAttendance: async (attendance) => {
    let text = 'update component_attendance set is_attending = $3 '
      + 'where task_id = $1 '
      + 'and usr_id = $2 ';
      let params = [attendance.TaskId, attendance.UserId, attendance.IsAttending];
      let result = await _dbContext.query(text, params);
      return attendance;
  }
}
