"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const CreateEvent = require('./create-event');
const CreateEventRequest = require('./model/create-event-request');
const Event = require('../entity/event');
const EventRepository = require('../repository/event-repository');
const Shared = require('../../_shared');

describe('CreateEvent', () => {
  let eventDateTime = '2017-07-12 18:30:00';
  let entityId = 1, entityType = Shared.Constants.EntityType.TASK;
  let displayType = Shared.Constants.ComponentDisplayType.TASK_ADDON;

  let eventRepository;
  let createEvent;

  beforeEach(function () {
    eventRepository = new EventRepository();
    createEvent = new CreateEvent(eventRepository);
  })

  describe('execute(createEventRequest)', () => {
    it('should export function', () => {
      expect(createEvent.execute).to.be.a('function');
    });

    it('should call create event repository function', () => {
      let createEventStub = sinon
        .stub(eventRepository, 'create')
        .returns(new Event(1, entityId, eventDateTime));

      let event = new Event(0, entityId, eventDateTime);
      let request = new CreateEventRequest(entityId, entityType, eventDateTime);
      createEvent.execute(request)

      sinon.assert.calledWith(createEventStub, event);
    });

    it('should throw an expection if the event was not created', () => {
      let createEventStub = sinon
        .stub(eventRepository, 'create')
        .returns(null);

      let request = new CreateEventRequest(entityId, entityType, eventDateTime);
      let createEventFn = function () { createEvent.execute(request); };

      expect(createEventFn).to.throw('There was an error creating the event or the entity does not exist');
    });
  });
});
