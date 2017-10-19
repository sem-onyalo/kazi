"use strict";

const Entity = require('../entity');

module.exports = class AssociationRepository {
  constructor(dbContext) {
    this._dbContext = dbContext;
  }

  async getById(id) {
    let text = 'select a.id, a.key, a.name, a.alias from association a where a.id = $1';
    let params = [id];
    let result = await this._dbContext.query(text, params);

    let entity = null;
    if (result !== null && result.rows.length > 0) {
      entity = new Entity.Association(result.rows[0].id, result.rows[0].key, result.rows[0].name, result.rows[0].alias);
    }

    return entity;
  }

  async getByKey(key) {
    let text = 'select a.id, a.key, a.name, a.alias from association a where a.key = $1';
    let params = [key];
    let result = await this._dbContext.query(text, params);

    let entity = null;
    if (result !== null && result.rows.length > 0) {
      entity = new Entity.Association(result.rows[0].id, result.rows[0].key, result.rows[0].name, result.rows[0].alias);
    }

    return entity;
  }

  async getPublicByKey(key) {
    let text = 'select a.id, a.key, a.name, a.alias from association a where a.key = $1 and a.is_public = TRUE';
    let params = [key];
    let result = await this._dbContext.query(text, params);

    let entity = null;
    if (result !== null && result.rows.length > 0) {
      entity = new Entity.Association(result.rows[0].id, result.rows[0].key, result.rows[0].name, result.rows[0].alias);
    }

    return entity;
  }

  async getByUserId(id) {
    let text = 'select a.id, a.key, a.name, a.alias from association a inner join association_usr au on au.association_id = a.id where au.usr_id = $1';
    let params = [id];
    let result = await this._dbContext.query(text, params);

    let entities = [];
    if (result !== null) {
      for (let i = 0; i < result.rows.length; i++) {
        entities.push(new Entity.Association(result.rows[i].id, result.rows[i].key, result.rows[i].name, result.rows[i].alias));
      }
    }

    return entities;
  }

  async create(association) {
    let text = 'insert into association (key, name, alias) values ($1, $2, $3) returning id';
    let params = [association.Key, association.Name, association.Alias];
    let result = await this._dbContext.query(text, params);

    if (result !== null && result.rows.length > 0) {
      association.Id = result.rows[0].id;
      return association;
    }

    return null;
  }

  async addUser(associationId, userId) {
    let text = 'insert into association_usr (association_id, usr_id) values ($1, $2)';
    let params = [associationId, userId];
    let result = await this._dbContext.query(text, params);

    return result.rowCount;
  }
}
