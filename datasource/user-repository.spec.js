"user strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const UserRepository = require('./user-repository');

describe('UserRepository', () => {
  let userRepository;

  beforeEach(function () {
    userRepository = new UserRepository();
  });

  describe('getByUsernameAndPassword(username, password)', () => {
    it('should export function', () => {
      expect(userRepository.getByUsernameAndPassword).to.be.a('function');
    });
  });
})
