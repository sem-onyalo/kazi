"use strict";

const DependencyFactory = require('../../factory/dependency-factory');
const Table = require('./table');
const TableCell = require('./table-cell');
const TableData = require('./table-data');
const TableRow = require('./table-row');

const _dbContext = DependencyFactory.resolve(require('../../datasource/db-context'));

module.exports = {
    getTableByTaskId: async (taskId) => {
        let text = 'select t.id as table_id, t.task_id, t.name as table_name ' 
            + ', tr.id as row_id, tr.row_order, tr.name as row_name ' 
            + ', tc.id as col_id, tc.col_order, tc.name as col_name '
            + ', td.value '
            + 'from component_table t '
            + 'inner join component_table_row tr on tr.table_id = t.id '
            + 'inner join component_table_col tc on tc.table_id = t.id '
            + 'left join component_table_data_int td on td.table_row_id = tr.id and td.table_col_id = tc.id '
            + 'where t.task_id = $1 '
            + 'order by tr.row_order, tc.col_order';
        let params = [taskId];
        let result = await _dbContext.query(text, params);

        let entity = undefined;
        if (result && result.rows.length > 0) {
            entity = new Table(result.rows[0].table_id, result.rows[0].task_id, result.rows[0].table_name);

            let rows = [], cells = [];
            let curRowId = result.rows[0].row_id;
            let curRowOrder = result.rows[0].row_order;
            let curRowName = result.rows[0].row_name;
            
            for (let i = 0; i < result.rows.length; i++) {
                if (curRowId !== result.rows[i].row_id) {
                    rows.push(new TableRow(curRowId, cells, curRowOrder, curRowName));
                    curRowId = result.rows[i].row_id;
                    curRowOrder = result.rows[i].row_order;
                    curRowName = result.rows[i].row_name;
                    cells = [];
                }

                cells.push(new TableCell(result.rows[i].col_id, result.rows[i].col_order, result.rows[i].col_name, result.rows[i].value ? result.rows[i].value : undefined));
            }

            rows.push(new TableRow(curRowId, cells, curRowOrder, curRowName));

            entity.Rows = rows;
        }

        return entity;
    },

    getTableData: async (rowId, colId) => {
        let text = 'select * from component_table_data_int where table_row_id = $1 and table_col_id = $2';
        let params = [rowId, colId];
        let result = await _dbContext.query(text, params);

        let entity = undefined;
        if (result && result.rows.length > 0) {
            entity = new TableData(result.rows[0].table_row_id, result.rows[0].table_col_id, result.rows[0].value);
        }

        return entity;
    },

    saveTableData: async (tableData) => {
        let text = 'insert into component_table_data_int (table_row_id, table_col_id, value) values ($1, $2, $3)';
        let params = [tableData.RowId, tableData.ColId, tableData.Value];
        let result = await _dbContext.query(text, params);
        return tableData;
    },

    updateTableData: async (tableData) => {
        let text = 'update component_table_data_int set value = $3 where table_row_id = $1 and table_col_id = $2';
        let params = [tableData.RowId, tableData.ColId, tableData.Value];
        let result = await _dbContext.query(text, params);
        return tableData;
    },

    addTableRow: async (tableId) => {
        let text = 'insert into component_table_row (table_id, row_order, name) '
            + "select  $1, max(row_order) + 1, '' " 
            + 'from component_table_row '
            + 'where table_id = $1';
        let params = [tableId];
        let result = await _dbContext.query(text, params);
    }
}