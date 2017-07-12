"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const DeleteEvent = require('./delete-event');
const DeleteEventRequest = require('./model/delete-event-request');
const EventRepository = require('../repository/event-repository');
const Shared = require('../../_shared');

describe('DeleteEvent', () => {
  let entityId = 1, entityType = Shared.Constants.EntityType.TASK;

  let eventRepository;
  let deleteEvent;

  beforeEach(function() {
    eventRepository = new EventRepository();
    deleteEvent = new DeleteEvent(eventRepository);
  });

  describe('execute(deleteEventRequest)', () => {
    it('should export function', () => {
      expect(deleteEvent.execute).to.be.a('function');
    });

    it('should call the event repository function delete', () => {
      let deleteEventStub = sinon
        .stub(eventRepository, 'deleteByEntityIdAndEntityType')
        .returns(null);

      let request = new DeleteEventRequest(entityId, entityType);
      let response = deleteEvent.execute(request);

      sinon.assert.calledWith(deleteEventStub, entityId, entityType);
    });
  });
});
