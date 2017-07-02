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
  });
});
