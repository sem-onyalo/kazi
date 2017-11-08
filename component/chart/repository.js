"use strict";

const DependencyFactory = require('../../factory/dependency-factory');
const ChartTableData = require('./chart-table-data');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

module.exports = {
    getChartTableDataByDirectoryId: async (directoryId) => {
        let text = 'select t.id as task_id, td.value '
            + ', tr.id as row_id, tr.name as row_name '
            + ', tc.id as col_id, tc.name as col_name '
            + 'from component_table ct '
            + 'inner join task t on t.id = ct.task_id '
            + 'inner join component_table_row tr on tr.table_id = ct.id '
            + 'inner join component_table_col tc on tc.table_id = ct.id '
            + 'left join component_table_data_int td on td.table_row_id = tr.id and td.table_col_id = tc.id '
            + 'where t.directory_id = $1 '
            + 'order by tr.row_order, tc.col_order';
        let params = [directoryId];
        let result = await _dbContext.query(text, params);

        let entities = [];
        if (result && result.rows.length > 0) {
            for (let i = 0; i < result.rows.length; i++) {
                entities.push(new ChartTableData(result.rows[i].task_id, result.rows[i].value, result.rows[i].row_id, result.rows[i].row_name, result.rows[i].col_id, result.rows[i].col_name));
            }
        }

        return entities;
    }
}