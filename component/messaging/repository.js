const DependencyFactory = require('../../factory/dependency-factory');
const Message = require('./message');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

module.exports = {
  getMessageById: async (id) => {
    let text = 'select t.id as task_id, u.id as usr_id, u.first_name, u.last_name, cm.id as message_id, cm.message, cm.create_timestamp '
      + 'from component_messaging cm '
      + 'inner join usr u on u.id = cm.usr_id '
      + 'inner join task t on t.id = cm.task_id '
      + 'where cm.id = $1';
    let params = [id];
    let result = await _dbContext.query(text, params);

    let entity = null;
    if (result && result.rows.length > 0) {
      entity = new Message(result.rows[0].message_id, result.rows[0].task_id, result.rows[0].usr_id, result.rows[0].message, result.rows[0].first_name, result.rows[0].last_name, result.rows[0].create_timestamp);
    }

    return entity;
  },

  getMessages: async (taskId) => {
    let text = 'select t.id as task_id, u.id as usr_id, u.first_name, u.last_name, cm.id as message_id, cm.message, cm.create_timestamp '
      + 'from component_messaging cm '
      + 'inner join usr u on u.id = cm.usr_id '
      + 'inner join task t on t.id = cm.task_id '
      + 'where t.id = $1 '
      + 'order by cm.create_timestamp asc';
    let params = [taskId];
    let result = await _dbContext.query(text, params);

    let entities = [];
    if (result && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        entities.push(new Message(result.rows[i].message_id, result.rows[i].task_id, result.rows[i].usr_id, result.rows[i].message, result.rows[i].first_name, result.rows[i].last_name, result.rows[i].create_timestamp));
      }
    }

    return entities;
  },

  getMessagesByLastMessageId: async (taskId, lastMessageId) => {
    let text = 'select t.id as task_id, u.id as usr_id, u.first_name, u.last_name, cm.id as message_id, cm.message, cm.create_timestamp '
      + 'from component_messaging cm '
      + 'inner join usr u on u.id = cm.usr_id '
      + 'inner join task t on t.id = cm.task_id '
      + 'where t.id = $1 '
      + 'and cm.id > $2 '
      + 'order by cm.create_timestamp asc';
    let params = [taskId, lastMessageId];
    let result = await _dbContext.query(text, params);

    let entities = [];
    if (result && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        entities.push(new Message(result.rows[i].message_id, result.rows[i].task_id, result.rows[i].usr_id, result.rows[i].message, result.rows[i].first_name, result.rows[i].last_name, result.rows[i].create_timestamp));
      }
    }

    return entities;
  },

  saveMessage: async (message) => {
    let text = 'with inserted as ( '
      + 'insert into component_messaging (task_id, usr_id, message) '
      + 'values ($1, $2, $3) returning id, create_timestamp, usr_id '
      + ') '
      + 'select inserted.id, inserted.create_timestamp, u.first_name, u.last_name '
      + 'from inserted '
      + 'inner join usr u on u.id = inserted.usr_id';
    let params = [message.TaskId, message.UserId, message.Message];
    let result = await _dbContext.query(text, params);

    if (result && result.rows.length > 0) {
      message.Id = result.rows[0].id;
      message.CreateTimestamp = result.rows[0].create_timestamp;
      message.FirstName = result.rows[0].first_name;
      message.LastName = result.rows[0].last_name;
      return message;
    }

    return undefined;
  }
}
