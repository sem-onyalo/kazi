"use strict";

const Winloss = require('./winloss');
const Constants = require('../../util/constants');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const PostComponentDataResponse = require('../_shared/post-component-data-response');
const Repository = require('./repository');

module.exports = {
    getData: async (request) => {
        let response = new GetComponentDataResponse(request.EntityId, request.EntityType);

        switch (request.EntityType) {
            case Constants.EntityType.TASK:
                response.DataObject = await Repository.getWinlossByTaskId(request.EntityId);
                break;

            case Constants.EntityType.DIRECTORY:
                response.DataObject = await Repository.getWinlossByDirectoryId(request.EntityId);
                break;

            default:
                response.DataObject = { error: 'Unsupported action' };
                break;
        }

        return response;
    },

    postData: async (request) => {
        let winloss = await Repository.getWinlossByTaskId(request.EntityId);

        if (winloss) {
            winloss.State = request.Data.State;
            winloss = await Repository.updateWinloss(winloss);
        } else {
            winloss = new Winloss(request.EntityId, request.Data.State);
            winloss = await Repository.saveWinloss(winloss);
        }

        let response = new PostComponentDataResponse(request.EntityId, request.EntityType, winloss);
        return response;
    }
}