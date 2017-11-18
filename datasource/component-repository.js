"use strict";

const Entity = require('../entity');
const SecurityHelper = require('../util/security-helper');

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

  async getById(id) {
    let text = 'select c.id, c.key, c.name from component c where c.id = $1';
    let params = [id];
    let result = await this._dbContext.query(text, params);

    let entity = null;
    if (result && result.rows.length > 0) {
      entity = new Entity.Component(result.rows[0].id, result.rows[0].key, result.rows[0].name);
    }

    return entity;
  }

  async getByTaskId(id) {
    let text = 'select c.id, c.key, c.name '
      + 'from component c '
      + 'inner join directory_component dc on dc.component_id = c.id '
      + 'inner join directory d on d.id = dc.directory_id '
      + 'inner join task t on t.directory_id = d.id '
      + 'where t.id = $1 '
      + 'order by dc.component_order';
    let params = [id];
    let result = await this._dbContext.query(text, params);

    let entities = [];
    if (result && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        let component = new Entity.Component(result.rows[i].id, result.rows[i].key, result.rows[i].name);
        entities.push(component);
      }
    }

    return entities;
  }

  async getByDirectoryId(id) {
    let text = 'select c.id, c.key, c.name, dc.directory_id '
      + 'from component c '
      + 'inner join directory_component dc on dc.component_id = c.id '
      + 'where dc.directory_id = $1';
    let params = [id];
    let result = await this._dbContext.query(text, params);

    let entities = [];
    if (result && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        let component = new Entity.Component(result.rows[i].id, result.rows[i].key, result.rows[i].name);
        component.DirectoryId = result.rows[i].directory_id;
        entities.push(component);
      }
    }

    return entities;
  }

  async getByComponentIdAndDirectoryId(componentId, directoryId) {
    let text = 'select c.id, c.key, c.name, dc.directory_id '
      + 'from component c '
      + 'inner join directory_component dc on dc.component_id = c.id '
      + 'where dc.directory_id = $1 '
      + 'and dc.component_id = $2';
    let params = [directoryId, componentId];
    let result = await this._dbContext.query(text, params);

    let entity = null;
    if (result && result.rows.length > 0) {
      entity = new Entity.Component(result.rows[0].id, result.rows[0].key, result.rows[0].name);
      entity.DirectoryId = result.rows[0].directory_id;
    }

    return entity;
  }

  async getByComponentIdAndTaskId(componentId, taskId) {
    let text = 'select c.id, c.key, c.name, t.task_id '
      + 'from component c '
      + 'inner join directory_component dc on dc.component_id = c.id '
      + 'inner join task t on t.directory_id = dc.directory_id '
      + 'where t.task_id = $1 '
      + 'and dc.component_id = $2';
    let params = [taskId, componentId];
    let result = await this._dbContext.query(text, params);

    let entity = null;
    if (result && result.rows.length > 0) {
      entity = new Entity.Component(result.rows[0].id, result.rows[0].key, result.rows[0].name);
      entity.TaskId = result.rows[0].task_id;
    }

    return entity;
  }

  async getRelationshipByDirectoryId(id) {
    let text = 'select c.id, c.key, c.name, coalesce(dc.directory_id,0) as directory_id '
      + 'from component c '
      + 'inner join usr_role ur on ur.id = $2 '
      + 'left join directory_component dc on dc.component_id = c.id and dc.directory_id = $1 '
      + 'where (ur.id < 2 and c.type in (0,1)) or (ur.id > 1 and c.type = 1) '
      + 'order by dc.directory_id, c.name';
    let params = [id, SecurityHelper.getSessionUser().UserRole];
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

  async addToDirectory(componentId, directoryId) {
    let text = 'insert into directory_component(directory_id, component_id, component_order) '
      + 'select $1, $2, coalesce(max(component_order), 0) + 1 '
      + 'from directory_component '
      + 'where directory_id = $1';
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
