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

  getByDirectoryId(id) {

  }

  getByTaskId(id) {

  }

  addToDirectory(componentId, directoryId) {

  }

  addToTask(componentId, taskId) {

  }
}
