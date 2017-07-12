"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');

const Event = require('../entity/event');
const EventRepository = require('../repository/event-repository');
const GetEvent = require('./get-event');
const GetEventRequest = require('./model/get-event-request');
const Shared = require('../../_shared');

describe('GetEvent', () => {
  let eventDateTime = '2017-07-12 18:30:00';
  let entityId = 1, entityType = Shared.Constants.EntityType.TASK;
  let displayType = Shared.Constants.ComponentDisplayType.TASK_ADDON;

  let eventRepository;
  let getEvent;

  beforeEach(function () {
    eventRepository = new EventRepository();
    getEvent = new GetEvent(eventRepository);
  })

  describe('execute(getEventRequest)', () => {
    it('should export function', () => {
      expect(getEvent.execute).to.be.a('function');
    });

    it('should call the event repository function getByEntityIdAndEntityTypeAndDisplayType', () => {
      let getEventStub = sinon
        .stub(eventRepository, 'getByEntityIdAndEntityTypeAndDisplayType')
        .returns(null);

      let request = new GetEventRequest(entityId, entityType, displayType);
      let response = getEvent.execute(request);

      sinon.assert.calledWith(getEventStub, entityId, entityType, displayType);
    });

    it('should return the entity id and entity type in the response', () => {
      let getEventStub = sinon
        .stub(eventRepository, 'getByEntityIdAndEntityTypeAndDisplayType')
        .returns(null);

      let request = new GetEventRequest(entityId, entityType, displayType);
      let response = getEvent.execute(request);

      assert.isDefined(response, 'Function should return a response');
      assert.strictEqual(response.EntityId, entityId, 'EntityId in response was not the expected value');
      assert.strictEqual(response.EntityType, entityType, 'EntityType in response was not the expected value');
    });

    it('should return an empty string if the event does not exist', () => {
      let getEventStub = sinon
        .stub(eventRepository, 'getByEntityIdAndEntityTypeAndDisplayType')
        .returns(null);

      let request = new GetEventRequest(entityId, entityType, displayType);
      let response = getEvent.execute(request);

      assert.isDefined(response, 'Function should return a response');
      assert.strictEqual(response.EventDateTime, '', 'EventDateTime should be an empty string');
    });

    it('should return the event date time in the response if the event exists', () => {
      let getEventStub = sinon
        .stub(eventRepository, 'getByEntityIdAndEntityTypeAndDisplayType')
        .returns(new Event(1, entityId, eventDateTime));

      let request = new GetEventRequest(entityId, entityType, displayType);
      let response = getEvent.execute(request);

      assert.isDefined(response, 'Function should return a response');
      assert.strictEqual(response.EventDateTime, eventDateTime, 'EventDateTime should be in response');
    });
  });
});
