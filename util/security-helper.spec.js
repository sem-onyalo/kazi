"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const SecurityHelper = require('./security-helper');

describe('SecurityHelper', () => {
  describe('generateRandomString(length)', () => {
    it('should export function', () => {
      expect(SecurityHelper.generateRandomString).to.be.a('function');
    });

    it('should return a string of the specified length', () => {
      let data = [5, 10, 100];
      for (let i = 0; i < data.length; i++) {
        let result = SecurityHelper.generateRandomString(data[i]);
        assert.isDefined(result, 'Random string generator should return a string');
        assert.strictEqual(result.length, data[i], 'Random string length should have been value passed in');
      }
    });
  });
});
