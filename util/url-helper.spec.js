"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const UrlHelper = require('./url-helper');

describe('UrlHelper', () => {
  describe('makeUrlFriendly(value)', () => {
    it('should export function', () => {
      expect(UrlHelper.makeUrlFriendly).to.be.a('function');
    });

    it('should replace special characters with hyphens', () => {
      let result = UrlHelper.makeUrlFriendly('r!@#$%^&*()o');
      assert.strictEqual(result ,'r-o', 'Special characters should not exist in result');
    });

    it('should replace all spaces with hyphens', () => {
      let result = UrlHelper.makeUrlFriendly('the quick brown fox');
      assert.strictEqual(result, 'the-quick-brown-fox', 'All spaces should have been replaced with hyphens');
    });

    it('should make all characters lowercase', () => {
      let result = UrlHelper.makeUrlFriendly('ArrearS');
      assert.strictEqual(result, 'arrears', 'All characters should be lowercase');
    });

    it('should return an empty string for a null value', () => {
      let result = UrlHelper.makeUrlFriendly(null);
      assert.strictEqual(result, '', 'A value of null should return an empty string');
    });

    it('should return an empty string for an undefined value', () => {
      let result = UrlHelper.makeUrlFriendly(undefined);
      assert.strictEqual(result, '', 'A value of undefined should return an empty string');
    });

    it('should return an empty string for an all whitespace value', () => {
      let result = UrlHelper.makeUrlFriendly('   ');
      assert.strictEqual(result, '', 'An all whitespace value should return an empty string');
    });
  });
});
