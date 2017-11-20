"use strict";

const Entity = require('../entity');

module.exports = class TaskRepository {
  constructor(dbContext) {
    this._dbContext = dbContext;
  }

  async getById(id) {
    let text = 'select t.id, t.directory_id, t.name from task t where t.id = $1'
    let params = [id];
    let result = await this._dbContext.query(text, params);

    let entity = null;
    if (result !== null && result.rows.length > 0) {
      entity = new Entity.Task(result.rows[0].id, result.rows[0].name, result.rows[0].directory_id);
    }

    return entity;
  }

  async getByDirectoryId(id) {
    let text = 'select t.id, t.directory_id, t.name from task t where t.directory_id = $1 order by t.update_timestamp desc';
    let params = [id];
    let result = await this._dbContext.query(text, params);

    let entities = [];
    if (result !== null) {
      for (let i = 0; i < result.rows.length; i++) {
        entities.push(new Entity.Task(result.rows[i].id, result.rows[i].name, result.rows[i].directory_id));
      }
    }

    return entities;
  }

  async getPublicByDirectoryId(id) {
    let text = 'select t.id, t.directory_id, t.name ' 
      + 'from task t ' 
      + 'inner join directory d on d.id = t.directory_id '
      + 'where t.directory_id = $1 '
      + 'and d.is_public = TRUE '
      + 'order by t.update_timestamp desc';
    let params = [id];
    let result = await this._dbContext.query(text, params);

    let entities = [];
    if (result !== null) {
      for (let i = 0; i < result.rows.length; i++) {
        entities.push(new Entity.Task(result.rows[i].id, result.rows[i].name, result.rows[i].directory_id));
      }
    }

    return entities;
  }

  async create(task) {
    let text = 'insert into task (directory_id, name) values ($1, $2) returning id';
    let params = [task.DirectoryId, task.Name];
    let result = await this._dbContext.query(text, params);

    if (result !== null && result.rows.length > 0) {
      task.Id = result.rows[0].id;
      return task;
    }

    return null;
  }

  async update(task) {
    let text = 'update task set directory_id = $2, name = $3, update_timestamp = current_timestamp where id = $1'
    let params = [task.Id, task.DirectoryId, task.Name];
    let result = await this._dbContext.query(text, params);

    return result !== null && result.rowCount > 0 ? task : null;
  }

  async delete(id) {
    let text = 'delete from task where id = $1';
    let params = [id];
    let result = await this._dbContext.query(text, params);
    return result.rowCount;
  }
}
