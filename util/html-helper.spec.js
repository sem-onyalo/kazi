"use strict";

const assert = require('chai').assert;
const expect = require('chai').expect;

const HtmlHelper = require('./html-helper');

describe('HtmlHelper', () => {
  describe('htmlEncode(value)', () => {
    it('should export function', () => {
      expect(HtmlHelper.htmlEncode).to.be.a('function');
    });

    it('should encode html characters', () => {
      let result = HtmlHelper.htmlEncode('<h1>One & Two</h1>');
      assert.strictEqual(result, '&lt;h1&gt;One &amp; Two&lt;/h1&gt;', 'The html encoded result was not the expected value');
    });
  });
});
