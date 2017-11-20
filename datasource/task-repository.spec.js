"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const TaskRepository = new require('./task-repository');

describe('TaskRepository', () => {
  let taskRepository;

  beforeEach(function() {
    taskRepository = new TaskRepository();
  });

  describe('getById(id)', () => {
    it('should export function', () => {
      expect(taskRepository.getById).to.be.a('function');
    });
  });

  describe('getByDirectoryId(id)', () => {
    it('should export function', () => {
      expect(taskRepository.getByDirectoryId).to.be.a('function');
    });
  });
  
  describe('getPublicByDirectoryId(id)', () => {
    it('should export function', () => {
      expect(taskRepository.getPublicByDirectoryId).to.be.a('function');
    });
  });

  describe('create(task)', () => {
    it('should export function', () => {
      expect(taskRepository.create).to.be.a('function');
    });
  });

  describe('update(task)', () => {
    it('should export function', () => {
      expect(taskRepository.update).to.be.a('function');
    });
  });

  describe('delete(id)', () => {
    it('should export function', () => {
      expect(taskRepository.delete).to.be.a('function');
    });
  });
});
