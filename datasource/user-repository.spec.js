"user strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const UserRepository = require('./user-repository');

describe('UserRepository', () => {
  let userRepository;

  beforeEach(function () {
    userRepository = new UserRepository();
  });

  describe('getByUsername(username)', () => {
    it('should export function', () => {
      expect(userRepository.getByUsername).to.be.a('function');
    });
  });

  describe('getByUsernameAndPassword(username, password)', () => {
    it('should export function', () => {
      expect(userRepository.getByUsernameAndPassword).to.be.a('function');
    });
  });

  describe('create(user)', () => {
    it('should export function', () => {
      expect(userRepository.create).to.be.a('function');
    });
  });

  describe('update(user)', () => {
    it('should export function', () => {
      expect(userRepository.update).to.be.a('function');
    });
  });
})
