"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const UpdateEvent = require('./update-event');
const UpdateEventRequest = require('./model/update-event-request');
const Event = require('../entity/event');
const EventRepository = require('../repository/event-repository');
const Shared = require('../../_shared');

describe('UpdateEvent', () => {
  let eventDateTime = '2017-07-12 18:30:00';
  let entityId = 1, entityType = Shared.Constants.EntityType.TASK;
  let displayType = Shared.Constants.ComponentDisplayType.TASK_ADDON;

  let eventRepository;
  let updateEvent;

  beforeEach(function () {
    eventRepository = new EventRepository();
    updateEvent = new UpdateEvent(eventRepository);
  })

  describe('execute(updateEventRequest)', () => {
    it('should export function', () => {
      expect(updateEvent.execute).to.be.a('function');
    });

    it('should call the update event repository function', () => {
      let updateEventStub = sinon
        .stub(eventRepository, 'update')
        .returns(new Event(1, entityId, eventDateTime));

      let event = new Event(0, entityId, eventDateTime);
      let request = new UpdateEventRequest(entityId, entityType, eventDateTime);
      updateEvent.execute(request);

      sinon.assert.calledWith(updateEventStub, event);
    });

    it('should throw an expection if the event was not updated', () => {
      let updateEventStub = sinon
        .stub(eventRepository, 'update')
        .returns(null);

      let request = new UpdateEventRequest(entityId, entityType, eventDateTime);
      let updateEventFn = function () { updateEvent.execute(request); };

      expect(updateEventFn).to.throw('There was an error updating the event or the entity does not exist');
    });
  });
});
