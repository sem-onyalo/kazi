"use strict";

const Winloss = require('./winloss');
const DependencyFactory = require('../../factory/dependency-factory');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

module.exports = {
    getWinlossByTaskId: async (taskId) => {
        let text = 'select task_id, state from component_winloss where task_id = $1';
        let params = [taskId];
        let result = await _dbContext.query(text, params);

        let entity = undefined;
        if (result && result.rows.length > 0) {
            entity = new Winloss(result.rows[0].task_id, result.rows[0].state);
        }

        return entity;
    },

    getWinlossByDirectoryId: async (directoryId) => {
        let text = 'select cw.task_id, cw.state from component_winloss cw inner join task t on t.id = cw.task_id where t.directory_id = $1';
        let params = [directoryId];
        let result = await _dbContext.query(text, params);

        let entities = [];
        if (result && result.rows.length > 0) {
            for (let i = 0; i < result.rows.length; i++) {
                entities.push(new Winloss(result.rows[i].task_id, result.rows[i].state));
            }
        }
    
        return entities;
    },

    saveWinloss: async (winloss) => {
        let text = 'insert into component_winloss (task_id, state) values ($1, $2);';
        let params = [winloss.TaskId, winloss.State];
        let result = await _dbContext.query(text, params);
        return winloss;
    },

    updateWinloss: async (winloss) => {
        let text = 'update component_winloss set state = $2 where task_id = $1';
        let params = [winloss.TaskId, winloss.State];
        let result = await _dbContext.query(text, params);
        return winloss;
    }
}