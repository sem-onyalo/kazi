"use strict";

const Repository = require('./repository');
const GetComponentDataResponse = require('../_shared/get-component-data-response');
const PostComponentDataResponse = require('../_shared/post-component-data-response');
const Volunteer = require('./volunteer');
const VolunteerItem = require('./volunteer-item');

var self = module.exports = {
  getData: async (request) => {
    let response = new GetComponentDataResponse(request.EntityId, request.EntityType);
    response.DataObject = await Repository.getVolunteers(request.EntityId);
    return response;
  },

  postData: async (request) => {
    switch(request.Data.Target) {
      case 'Volunteer':
        return await self.postVolunteerData(request);
      case 'VolunteerItem':
        return await self.postVolunteerItemData(request);
      default:
        return self.postDataUnsupported(request);
    }
  },

  postVolunteerData: async (request) => {
    let volunteer = await Repository.getVolunteerByTaskIdAndItemId(request.EntityId, request.Data.ItemId);
    if (volunteer && !request.Data.IsVolunteer) {
      await Repository.deleteVolunteer(volunteer);
      volunteer.UserId = volunteer.FirstName = volunteer.LastName = undefined;
    } else if (!volunteer && request.Data.IsVolunteer) {
      volunteer = new Volunteer(request.EntityId, request.Data.UserId, request.Data.ItemId);
      await Repository.saveVolunteer(volunteer);
      volunteer = await Repository.getVolunteerByTaskIdAndItemId(request.EntityId, request.Data.ItemId);
    } else {
      return self.postDataUnsupported(request);
    }

    let response = new PostComponentDataResponse(request.EntityId, request.EntityType, volunteer);
    return response;
  },

  postVolunteerItemData: async (request) => {
    switch (request.Data.Action) {
      case 'AddOrUpdate':
        let volunteerItem;
        if (request.Data.ItemId) {
          volunteerItem = await Repository.getVolunteerItemById(request.Data.ItemId);
          volunteerItem.ItemName = request.Data.ItemName;
          await Repository.updateVolunteerItem(volunteerItem);
        } else {
          volunteerItem = new VolunteerItem(request.Data.DirectoryId, 0, request.Data.ItemName);
          let itemId = await Repository.saveVolunteerItem(volunteerItem);
          volunteerItem = await Repository.getVolunteerItemById(itemId);
        }
        return new PostComponentDataResponse(request.EntityId, request.EntityType, volunteerItem);

      case 'Delete':
        let deleteRowCount = await Repository.deleteVolunteerItem(request.Data.ItemId);
        return new PostComponentDataResponse(request.EntityId, request.EntityType, deleteRowCount);

      default:
        return self.postDataUnsupported(request);
    }
  },

  postDataUnsupported: (request) => {
    return new PostComponentDataResponse(request.EntityId, request.EntityType, { error: 'Unsupported action' });
  }
}
