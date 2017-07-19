"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const DirectoryRepository = require('./directory-repository');

describe('DirectoryRepository', () => {
  let directoryRepository;

  beforeEach(function () {
    directoryRepository = new DirectoryRepository();
  });

  describe('getById(id)', () => {
    it('should export function', () => {
      expect(directoryRepository.getById).to.be.a('function');
    });
  });

  describe('getByKeyAndAssociationId(key, associationId)', () => {
    it('should export function', () => {
      expect(directoryRepository.getByKeyAndAssociationId).to.be.a('function');
    });
  });

  describe('getByAssociationId', () => {
    it('should export function', () => {
      expect(directoryRepository.getByAssociationId).to.be.a('function');
    });
  });

  describe('create(directory)', () => {
    it('should export function', () => {
      expect(directoryRepository.create).to.be.a('function');
    });
  });

  describe('update(directory)', () => {
    it('should export function', () => {
      expect(directoryRepository.update).to.be.a('function');
    });
  });

  describe('delete(id)', () => {
    it('should export function', () => {
      expect(directoryRepository.delete).to.be.a('function');
    });
  });
});
