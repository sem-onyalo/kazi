"use strict";

const Constants = require('../../util/constants');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const Message = require('./message');
const PostComponentDataResponse = require('../_shared/post-component-data-response');
const Repository = require('./repository');

module.exports = {
  getData: async (request) => {
    let response = new GetComponentDataResponse(request.EntityId, request.EntityType);

    switch (request.EntityType) {
      case Constants.EntityType.TASK:
        if (request.QueryParams.lastmessageid) {
          response.DataObject = await Repository.getMessagesByLastMessageId(request.EntityId, request.QueryParams.lastmessageid);
        } else {
          response.DataObject = await Repository.getMessages(request.EntityId);
        }
        break;

      case Constants.EntityType.DIRECTORY:
        response.DataObject = undefined;
        break;

      default:
        response.DataObject = { error: 'Unsupported action' };
        break;
    }

    return response;
  },

  postData: async (request) => {
    let message = new Message(0, request.EntityId, request.Data.UserId, request.Data.Message);
    message = await Repository.saveMessage(message);

    let response = new PostComponentDataResponse(request.EntityId, request.EntityType, message);
    return response;
  }
}
