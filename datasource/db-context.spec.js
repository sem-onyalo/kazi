"ues strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const DbContext = require('./db-context');

describe('DbContext', () => {
  describe('ping()', () => {
    it('should export function', () => {
      expect(DbContext.ping).to.be.a('function');
    });
  });
});
