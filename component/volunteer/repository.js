"use strict";

const DependencyFactory = require('../../factory/dependency-factory');
const Volunteer = require('./volunteer');
const VolunteerItem = require('./volunteer-item');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

const _selectVolunteerSql = 'select t.id as task_id, u.id as usr_id, cv.item_id, cvi.name as item_name '
  + ', u.first_name, u.last_name '
  + 'from task t '
  + 'inner join directory d on d.id = t.directory_id '
  + 'inner join association a on a.id = d.association_id '
  + 'inner join association_usr au on au.association_id = a.id '
  + 'inner join usr u on u.id = au.usr_id ';

  module.exports = {
    getVolunteers: async (taskId) => {
      let text = 'select cvi.id as item_id, cvi.name as item_name, t.id as task_id, u.id as usr_id, u.first_name, u.last_name '
        + 'from component_volunteer_item cvi '
        + 'inner join directory d on d.id = cvi.directory_id '
        + 'inner join task t on t.directory_id = d.id '
        + 'left join component_volunteer cv on cv.item_id = cvi.id and cv.task_id = t.id '
        + 'left join usr u on u.id = cv.usr_id '
        + 'where t.id = $1';
      let params = [taskId];
      let result = await _dbContext.query(text, params);

      let entities = [];
      if (result && result.rows.length > 0) {
        for (let i = 0; i < result.rows.length; i++) {
          entities.push(new Volunteer(result.rows[i].task_id, result.rows[i].usr_id, result.rows[i].item_id
            , result.rows[i].item_name, result.rows[i].first_name, result.rows[i].last_name));
        }
      }

      return entities;
    },

    getVolunteerByTaskIdAndItemId: async (taskId, itemId) => {
      let text = _selectVolunteerSql
        + 'inner join component_volunteer cv on cv.task_id = t.id and cv.usr_id = u.id '
        + 'inner join component_volunteer_item cvi on cvi.id = cv.item_id '
        + 'where cv.task_id = $1 '
        + 'and cv.item_id = $2';
      let params = [taskId, itemId];
      let result = await _dbContext.query(text, params);

      let entity = null;
      if (result && result.rows.length > 0) {
        entity = new Volunteer(result.rows[0].task_id, result.rows[0].usr_id, result.rows[0].item_id
          , result.rows[0].item_name, result.rows[0].first_name, result.rows[0].last_name);
      }

      return entity;
    },

    // getVolunteerByTaskIdAndUserIdAndItemId: async (taskId, userId, itemId) => {
    //   let text = _selectVolunteerSql
    //     + 'inner join component_volunteer cv on cv.task_id = t.id and cv.usr_id = u.id '
    //     + 'inner join component_volunteer_item cvi on cvi.id = cv.item_id '
    //     + 'where cv.task_id = $1 '
    //     + 'and cv.usr_id = $2 '
    //     + 'and cv.item_id = $3';
    //   let params = [volunteer.TaskId, volunteer.UserId, volunteer.ItemId];
    //   let result = await _dbContext.query(text, params);
    //
    //   let entity = null;
    //   if (result && result.rows.length > 0) {
    //     entity = new Volunteer(result.rows[0].task_id, result.rows[0].usr_id, result.rows[0].item_id
    //       , result.rows[0].item_name, result.rows[0].first_name, result.rows[0].last_name);
    //   }
    //
    //   return entity;
    // },

    getVolunteerItemById: async (id) => {
      let text = 'select id, directory_id, name from component_volunteer_item '
        + 'where id = $1';
      let params = [id];
      let result = await _dbContext.query(text, params);

      let entity = null;
      if (result && result.rows.length > 0) {
        entity = new VolunteerItem(result.rows[0].directory_id, result.rows[0].id, result.rows[0].name);
      }

      return entity;
    },

    saveVolunteer: async (volunteer) => {
      let text = 'insert into component_volunteer (task_id, usr_id, item_id) '
        + 'values ($1, $2, $3)';
      let params = [volunteer.TaskId, volunteer.UserId, volunteer.ItemId];
      let result = await _dbContext.query(text, params);
      return result.rowCount;
    },

    saveVolunteerItem: async (volunteerItem) => {
      let text = 'insert into component_volunteer_item (directory_id, name) '
        + 'values ($1, $2) returning id';
      let params = [volunteerItem.DirectoryId, volunteerItem.ItemName];
      let result = await _dbContext.query(text, params);
      return (result && result.rowCount > 0) ? result.rows[0].id : 0;
    },

    updateVolunteerItem: async (volunteerItem) => {
      let text = 'update component_volunteer_item set name = $2 '
        + 'where id = $1';
      let params = [volunteerItem.ItemId, volunteerItem.ItemName];
      let result = await _dbContext.query(text, params);
      return result.rowCount;
    },

    deleteVolunteer: async (volunteer) => {
      let text = 'delete from component_volunteer '
        + 'where task_id = $1 '
        + 'and usr_id = $2 '
        + 'and item_id = $3';
      let params = [volunteer.TaskId, volunteer.UserId, volunteer.ItemId];
      let result = await _dbContext.query(text, params);
      return result.rowCount;
    },

    deleteVolunteerItem: async (id) => {
      let text = 'delete from component_volunteer_item where id = $1';
      let params = [id];
      let result = await _dbContext.query(text, params);
      return result.rowCount;
    }
  }
