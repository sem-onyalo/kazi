"use strict";

const expect = require('chai').expect;

const EventRepository = require('./event-repository');

describe('EventRepository', () => {
  let eventRepository;

  beforeEach(function () {
    eventRepository = new EventRepository();
  });

  describe('getByEntityIdAndEntityTypeAndDisplayType(entityId, entityType, displayType)', () => {
    it('should export function', () => {
      expect(eventRepository.getByEntityIdAndEntityTypeAndDisplayType).to.be.a('function');
    });
  });

  describe('create(event)', () => {
    it('should export function', () => {
      expect(eventRepository.create).to.be.a('function');
    });
  });

  describe('update(event)', () => {
    it('should export function', () => {
      expect(eventRepository.update).to.be.a('function');
    });
  });

  describe('deleteByEntityIdAndEntityType', () => {
    it('should export function', () => {
      expect(eventRepository.deleteByEntityIdAndEntityType).to.be.a('function');
    });
  });
});
