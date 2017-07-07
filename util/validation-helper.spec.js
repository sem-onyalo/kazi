"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const ValidationHelper = require('./validation-helper');

describe('ValidationHelper', () => {
  describe('stringNotNullOrEmpty(value, errorMessage)', () => {
    it('should export function', () => {
      expect(ValidationHelper.stringNotNullOrEmpty).to.be.a('function');
    });

    it('should throw an exception for a null or empty value', () => {
      let errorMessage = 'Validation failed message';
      let stringNotNullOrEmptyFn = function () { ValidationHelper.stringNotNullOrEmpty(null, errorMessage); };
      expect(stringNotNullOrEmptyFn).to.throw(errorMessage);

      errorMessage = 'Validation failed message';
      stringNotNullOrEmptyFn = function () { ValidationHelper.stringNotNullOrEmpty(undefined, errorMessage); };
      expect(stringNotNullOrEmptyFn).to.throw(errorMessage);

      errorMessage = 'Validation failed message';
      stringNotNullOrEmptyFn = function () { ValidationHelper.stringNotNullOrEmpty('', errorMessage); };
      expect(stringNotNullOrEmptyFn).to.throw(errorMessage);
    });

    it('should return false if the string is null or empty and no error message is provided', () => {
      let data = [null, undefined, ''];
      for (let i = 0; i < data.length; i++) {
        let result = ValidationHelper.stringNotNullOrEmpty(data[i]);
        assert.strictEqual(result, false, 'The result should be false');
      }
    });

    it('should return true if the string is null or empty and no error message is provided', () => {
      let result = ValidationHelper.stringNotNullOrEmpty('test');
      assert.strictEqual(result, true, 'The result should be true');
    });
  });

  describe('regex(regex, value, errorMessage)', () => {
    it('should export function', () => {
      expect(ValidationHelper.regexMatch).to.be.a('function');
    });
  });

  describe('existsInArray(array, value)', () => {
    it('should export function', () => {
      expect(ValidationHelper.existsInArray).to.be.a('function');
    });
  });
});
