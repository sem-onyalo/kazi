"use strict";

const Constants = require('../../util/constants');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const PostComponentDataResponse = require('../_shared/post-component-data-response');
const Repository = require('./repository');

module.exports = {
    getData: async (request) => {
        let response = new GetComponentDataResponse(request.EntityId, request.EntityType);

        switch (request.EntityType) {
            case Constants.EntityType.DIRECTORY:
                let chartData = await Repository.getChartTableDataByDirectoryId(request.EntityId);
                response.DataObject = { DataSource: 'Table', ChartData: chartData };
                break;
                
            default:
                response.DataObject = { error: 'Unsupported action' };
                break;
        }

        return response;
    }
}