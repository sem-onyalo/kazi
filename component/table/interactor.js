"use strict";

const Constants = require('../../util/constants');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const PostComponentDataResponse = require('../_shared/post-component-data-response');
const Repository = require('./repository');
// const Table = require('./table');
// const TableCell = require('./table-cell');
// const TableRow = require('./table-row');

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
    }
}