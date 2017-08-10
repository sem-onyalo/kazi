"use strict";

const Attendance = require('./attendance');
const Repository = require('./repository');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const PostComponentDataResponse = require('../_shared/post-component-data-response');

module.exports = {
  getData: async (request) => {
    let response = new GetComponentDataResponse(request.EntityId, request.EntityType);
    response.DataObject = await Repository.getAttendance(request.EntityId);
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
