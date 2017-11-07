"use strict";

const Constants = require('../../util/constants');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const PostComponentDataResponse = require('../_shared/post-component-data-response');
const Repository = require('./repository');
const TableData = require('./table-data');

module.exports = {
    getData: async (request) => {
        let response = new GetComponentDataResponse(request.EntityId, request.EntityType);

        switch (request.EntityType) {
            case Constants.EntityType.TASK:
                response.DataObject = await Repository.getTableByTaskId(request.EntityId);
                break;

            default:
                response.DataObject = { error: 'Unsupported action' };
                break;
        }

        return response;
    },
    
    postData: async (request) => {
        switch (request.Data.Action) {
            case 'Data':
                let tableData = await Repository.getTableData(request.Data.RowId, request.Data.ColId);
                if (tableData) {
                    tableData.Value = request.Data.Value;
                    await Repository.updateTableData(tableData);
                } else {
                    tableData = new TableData(request.Data.RowId, request.Data.ColId, request.Data.Value);
                    await Repository.saveTableData(tableData);
                }
                return new PostComponentDataResponse(request.EntityId, request.EntityType, tableData);

            // case 'Table':
            //     break;

            case 'Rows':
                for (let i = 0; i < parseInt(request.Data.RowCount); i++) {
                    await Repository.addTableRow(request.Data.TableId);
                }
                return new PostComponentDataResponse(request.EntityId, request.EntityType, request.Data);

            // case 'Cols':
            //     break;

            default:
                return new PostComponentDataResponse(request.EntityId, request.EntityType, { error: 'Unsupported action' });
        }
    }
}