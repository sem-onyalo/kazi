"use strict";

const Attendance = require('./attendance');
const Constants = require('../../util/constants');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const PostComponentDataResponse = require('../_shared/post-component-data-response');
const Repository = require('./repository');

module.exports = {
  getData: async (request) => {
    let response = new GetComponentDataResponse(request.EntityId, request.EntityType);

    switch (request.EntityType) {
      case Constants.EntityType.TASK:
        response.DataObject = await Repository.getAttendance(request.EntityId);
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
    let attendance = await Repository.getAttendanceByTaskIdAndUserId(request.EntityId, request.Data.UserId);
    if (attendance) {
      attendance.IsAttending = request.Data.IsAttending;
      await Repository.updateAttendance(attendance);
    } else {
      attendance = new Attendance(request.EntityId, request.Data.UserId);
      attendance.IsAttending = request.Data.IsAttending;
      await Repository.saveAttendance(attendance);
      attendance = await Repository.getAttendanceByTaskIdAndUserId(request.EntityId, request.Data.UserId);
    }

    let response = new PostComponentDataResponse(request.EntityId, request.EntityType, attendance);
    return response;
  }
}
