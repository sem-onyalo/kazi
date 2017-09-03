"use strict";

const DependencyFactory = require('../../factory/dependency-factory');
const Feedback = require('./feedback');
const FeedbackSettings = require('./feedback-settings');
const Task = require('../../entity/task');
const TaskRepository = require('../../datasource/task-repository');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

module.exports = {
  getFeedback: async (directoryId) => {
    let text = 'select f.details, t.name as task_name, u.id as usr_id, u.first_name, u.last_name, u.username '
      + 'from component_feedback f '
      + 'inner join usr u on u.id = f.usr_id '
      + 'inner join task t on t.id = f.task_id '
      + 'where t.directory_id = $1';
    let params = [directoryId];
    let result = await _dbContext.query(text, params);

    let entities = [];
    if (result && result.rows.length > 0) {
      for (let i = 0; i < result.rows.length; i++) {
        entities.push(new Feedback(result.rows[i].directory_id, result.rows[i].task_name, result.rows[i].details, result.rows[i].usr_id, result.rows[i].first_name, result.rows[i].last_name));
      }
    }

    return entities;
  },

  getFeedbackSettings: async () => {
    let text = 'select directory_id from component_feedback_settings';
    let result = await _dbContext.query(text, []);

    let entity = null;
    if (result && result.rows.length > 0) {
      entity = new FeedbackSettings(result.rows[0].directory_id);
    }

    return entity;
  },

  saveFeedback: async (feedback) => {
    let _taskRepository = DependencyFactory.resolve(TaskRepository);

    let task = new Task(0, feedback.Title, feedback.DirectoryId);
    task = await _taskRepository.create(task);

    let text = 'insert into component_feedback (task_id, usr_id, details) '
      + 'values ($1, $2, $3)';
    let params = [task.Id, feedback.UserId, feedback.Details];
    let result = await _dbContext.query(text, params);
    return task;
  }
}
