"use strict";

const Entity = require('../entity');

module.exports = class DirectoryRepository {
  constructor(dbContext) {
    this._dbContext = dbContext;
  }

  async getById(id) {
    let text = 'select d.id, d.association_id, d.parent_id, d.key, d.name from directory d where d.id = $1';
    let params = [id];
    let result = await this._dbContext.query(text, params);

    let entity = null;
    if (result !== null && result.rows.length > 0) {
      entity = new Entity.Directory(result.rows[0].id, result.rows[0].association_id, result.rows[0].parent_id, result.rows[0].key, result.rows[0].name);
    }

    return entity;
  }

  async getByKeyAndAssociationId(key, associationId) {
    let text = 'select d.id, d.association_id, d.parent_id, d.key, d.name from directory d where d.key = $1 and d.association_id = $2';
    let params = [key, associationId];
    let result = await this._dbContext.query(text, params);

    let entity = null;
    if (result !== null && result.rows.length > 0) {
      entity = new Entity.Directory(result.rows[0].id, result.rows[0].association_id, result.rows[0].parent_id, result.rows[0].key, result.rows[0].name);
    }

    return entity;
  }

  async getByAssociationId(id) {
    let text = 'select d.id, d.association_id, d.parent_id, d.key, d.name from directory d where d.association_id = $1';
    let params = [id];
    let result = await this._dbContext.query(text, params);

    let entities = [];
    if (result !== null) {
      for (let i = 0; i < result.rows.length; i++) {
        entities.push(new Entity.Directory(result.rows[i].id, result.rows[i].association_id, result.rows[i].parent_id, result.rows[i].key, result.rows[i].name));
      }
    }

    return entities;
  }

  async create(directory) {
    let text = 'insert into directory (association_id, parent_id, key, name) values ($1, $2, $3, $4) returning id';
    let params = [directory.AssociationId, directory.ParentId, directory.Key, directory.Name];
    let result = await this._dbContext.query(text, params);

    if (result !== null && result.rows.length > 0) {
      directory.Id = result.rows[0].id;
      return directory;
    }

    return null;
  }

  async update(directory) {
    let text = 'update directory set association_id = $1, parent_id = $2, key = $3, name = $4 where id = $5';
    let params = [directory.AssociationId, directory.ParentId, directory.Key, directory.Name, directory.Id];
    let result = await this._dbContext.query(text, params);

    return result !== null && result.rowCount > 0 ? directory : null;
  }

  async delete(id) {
    let text = 'delete from directory where id = $1';
    let params = [id];
    let result = await this._dbContext.query(text, params);
    
    return result.rowCount;
  }
}
