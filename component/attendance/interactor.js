"use strict";

const Repository = require('./repository');
const GetComponentDataResponse = require('../_shared/get-component-data-response');

module.exports = {
  getData: async (request) => {
    let response = new GetComponentDataResponse(request.EntityId, request.EntityType);
    response.DataObject = await Repository.getAttendance(request.EntityId);
    return response;
  }
}
