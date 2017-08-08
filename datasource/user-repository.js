"use strict";

const Entity = require('../entity');

const selectUserSql = 'select u.id, u.first_name, u.last_name, u.username, u.password, u.auth_token, u.user_role';

module.exports = class UserRepository {
  constructor(dbContext) {
    this._dbContext = dbContext;
  }

  async getByUsername(username) {
    let text = selectUserSql + ' from usr u where u.username = $1';
    let params = [username];
    let result = await this._dbContext.query(text, params);

    let entity = null;
    if (result !== null && result.rows.length > 0) {
      entity = new Entity.User(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].username, result.rows[0].password, result.rows[0].auth_token, result.rows[0].user_role);
    }

    return entity;
  }

  async getByUsernameAndPassword(username, password) {
    let text = selectUserSql + ' from usr u where u.username = $1 and u.password = $2';
    let params = [username, password];
    let result = await this._dbContext.query(text, params);

    let entity = null;
    if (result !== null && result.rows.length > 0) {
      entity = new Entity.User(result.rows[0].id, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].username, result.rows[0].password, result.rows[0].auth_token, result.rows[0].user_role);
    }

    return entity;
  }

  async create(user) {
    let text = 'insert into usr (first_name, last_name, username, password, auth_token, user_role) values ($1, $2, $3, $4, $5, $6) returning id';
    let params = [user.FirstName, user.LastName, user.Username, user.Password, user.AuthToken, user.UserRole];
    let result = await this._dbContext.query(text, params);

    if (result !== null && result.rows.length > 0) {
      user.Id = result.rows[0].id;
      return user;
    }

    return null;
  }

  async update(user) {
    let text = 'update usr set first_name = $2, last_name = $3, username = $4, password = $5, auth_token = $6, user_role = $7, update_timestamp = current_timestamp where id = $1';
    let params = [user.Id, user.FirstName, user.LastName, user.Username, user.Password, user.AuthToken, user.UserRole];
    let result = await this._dbContext.query(text, params);

    return result !== null && result.rowCount > 0 ? user : null;
  }
}
