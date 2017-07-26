"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const ComponentRepository = require('./component-repository');

describe('ComponentRepository', () => {
  let componentRepository;

  beforeEach(function () {
    componentRepository = new ComponentRepository();
  });

  describe('get()', () => {
    it('should export function', () => {
      expect(componentRepository.get).to.be.a('function');
    });
  });

  describe('getByDirectoryId(id)', () => {
    it('should export function', () => {
      expect(componentRepository.getByDirectoryId).to.be.a('function');
    });
  });

  describe('getByTaskId(id)', () => {
    it('should export function', () => {
      expect(componentRepository.getByTaskId).to.be.a('function');
    });
  });

  describe('addToDirectory(componentId, directoryId)', () => {
    it('should export function', () => {
      expect(componentRepository.addToDirectory).to.be.a('function');
    });
  });

  describe('addToTask(componentId, taskId)', () => {
    it('should export function', () => {
      expect(componentRepository.addToTask).to.be.a('function');
    });
  });
});
