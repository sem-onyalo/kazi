"use strict";

const DependencyFactory = require('../../factory/dependency-factory');
const ChartTableData = require('./chart-table-data');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

module.exports = {
    getChartTableDataByDirectoryId: async (directoryId) => {
        let text = 'select t.id as task_id, t.name as task_name, td.value '
            + ', tr.id as row_id, tr.row_order, tr.name as row_name '
            + ', tc.id as col_id, tc.col_order, tc.name as col_name '
            + ', ccd.xaxis_col_num, ccd.yaxis_col_num, ccd.xaxis_name, ccd.yaxis_name '
            + ', cct.color as chart_color, cct.alias as chart_alias '
            + 'from component_table ct '
            + 'inner join task t on t.id = ct.task_id '
            + 'inner join component_table_row tr on tr.table_id = ct.id '
            + 'inner join component_table_col tc on tc.table_id = ct.id '
            + 'inner join component_chart_directory ccd on ccd.directory_id = t.directory_id '
            + 'left join component_table_data_int td on td.table_row_id = tr.id and td.table_col_id = tc.id '
            + 'left join component_chart_task cct on cct.task_id = t.id '
            + 'where t.directory_id = $1 '
            + 'order by tr.row_order, tc.col_order';
        let params = [directoryId];
        let result = await _dbContext.query(text, params);

        let entities = [];
        if (result && result.rows.length > 0) {
            for (let i = 0; i < result.rows.length; i++) {
                entities.push(new ChartTableData(result.rows[i].task_id, result.rows[i].task_name, result.rows[i].value, result.rows[i].row_id, result.rows[i].row_order, result.rows[i].row_name, result.rows[i].col_id, result.rows[i].col_order, result.rows[i].col_name, result.rows[i].xaxis_col_num, result.rows[i].yaxis_col_num, result.rows[i].xaxis_name, result.rows[i].yaxis_name, result.rows[i].chart_color, result.rows[i].chart_alias));
            }
        }

        return entities;
    }
}