"use strict";

const Entity = require('../entity');

module.exports = class ComponentRepository {
  constructor(dbContext) {
    this._dbContext = dbContext;
  }

  async get() {
    let text = 'select c.id, c.key, c.name from component c';
    let params = [];
    let result = await this._dbContext.query(text, params);

    let entities = [];
    if (result !== null && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        entities.push(new Entity.Component(result.rows[i].id, result.rows[i].key, result.rows[i].name));
      }
    }

    return entities;
  }

  // async getById(id) {
  //   let text = 'select c.id, c.key, c.name from component c where c.id = $1';
  //   let params = [id];
  //   let result = await this._dbContext.query(text, params);
  //
  //   let entity = null;
  //   if (result !== null && result.rows.length > 0) {
  //     entity = new Entity.Component(result.rows[i].id, result.rows[i].key, result.rows[i].name);
  //   }
  //
  //   return entity;
  // }

  async getByDirectoryId(id) {
    let text = 'select c.id, c.key, c.name, coalesce(dc.directory_id,0) as directory_id from component c '
      + 'left join directory_component dc on dc.component_id = c.id and dc.directory_id = $1';
    let params = [id];
    let result = await this._dbContext.query(text, params);

    let entities = [];
    if (result !== null && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        let component = new Entity.Component(result.rows[i].id, result.rows[i].key, result.rows[i].name);
        component.DirectoryId = result.rows[i].directory_id;
        entities.push(component);
      }
    }

    return entities;
  }

  getByTaskId(id) {

  }

  async addToDirectory(componentId, directoryId) {
    let text = 'insert into directory_component(directory_id, component_id) values ($1, $2)';
    let params = [directoryId, componentId];
    let result = await this._dbContext.query(text, params);
    return result.rowCount;
  }

  async addToTask(componentId, taskId) {
    let text = 'insert into task_component(task_id, component_id) values ($1, $2)';
    let params = [taskId, componentId];
    let result = await this._dbContext.query(text, params);
    return result.rowCount;
  }
}
