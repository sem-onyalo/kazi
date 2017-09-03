"use strict";

const Constants = require('../../util/constants');
const Feedback = require('./feedback');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const PostComponentDataResponse = require('../_shared/post-component-data-response');
const Repository = require('./repository');

module.exports = {
  getData: async (request) => {
    let response = new GetComponentDataResponse(request.EntityId, request.EntityType);

    switch (request.EntityType) {
      case Constants.EntityType.TASK:
        response.DataObject = undefined;
        break;

      case Constants.EntityType.DIRECTORY:
        response.DataObject = await Repository.getFeedback(request.EntityId);
        break;

      default:
        response.DataObject = { error: 'Unsupported action' };
        break;
    }

    return response;
  },

  postData: async (request) => {
    let settings = await Repository.getFeedbackSettings();
    let feedback = new Feedback(settings.DirectoryId, request.Data.UserId, request.Data.Title, request.Data.Details);
    return await Repository.saveFeedback(feedback);
  }
}
