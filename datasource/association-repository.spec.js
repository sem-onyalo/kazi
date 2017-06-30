"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const AssociationRepository = require('./association-repository');

describe('AssociationRepository', () => {
  let associationRepository;

  beforeEach(function () {
    associationRepository = new AssociationRepository();
  });

  describe('getById(id)', () => {
    it('should export function', () => {
      expect(associationRepository.getById).to.be.a('function');
    });
  });

  describe('getByKey(key)', () => {
    it('should export function', () => {
      expect(associationRepository.getByKey).to.be.a('function');
    });
  });

  describe('getByUserId(id)', () => {
    it('should export function', () => {
      expect(associationRepository.getByUserId).to.be.a('function');
    })
  });

  describe('create(association)', () => {
    it('should export function', () => {
      expect(associationRepository.create).to.be.a('function');
    });
  });
});
