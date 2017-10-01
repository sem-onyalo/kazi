const DependencyFactory = require('../../factory/dependency-factory');
const Message = require('./message');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

module.exports = {
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
    let text = 'insert into component_messaging (task_id, usr_id, message) '
      + 'values ($1, $2, $3) returning id, create_timestamp';
    let params = [message.TaskId, message.UserId, message.Message];
    let result = await _dbContext.query(text, params);

    if (result && result.rows.length > 0) {
      message.Id = result.rows[0].id;
      message.CreateTimestamp = result.rows[0].create_timestamp;
      return message;
    }

    return undefined;
  }
}
