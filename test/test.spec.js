const should = require("should");
const normalizedJSON = require('..');

describe('Normalized JSON', () => {
  it('Should convert `1`', () => {
      should(normalizedJSON(1)).be.equal('1');
  });
  
  it('Should convert `-1`', () => {
      should(normalizedJSON(-1)).be.equal('-1');
  });
  
  it('Should convert `true`', () => {
      should(normalizedJSON(true)).be.equal('true');
  });
  
  it('Should convert `null`', () => {
      should(normalizedJSON(null)).be.equal('null');
  });
  
  it('Should convert `"hello"`', () => {
      should(normalizedJSON('hello')).be.equal('"hello"');
  });
  
  it('Should convert `[1,2,3]`', () => {
      should(normalizedJSON([1,2,3])).be.equal('[1,2,3]');
  });
  
  it('Should convert `{"a":1,"b":2}`', () => {
      should(normalizedJSON({a: 1, b: 2})).be.equal('{"a":1,"b":2}');
  });
  
  it('Should convert `{"a":1}`', () => {
      should(normalizedJSON({a: 1, b: 2}, ['a'])).be.equal('{"a":1}');
  });
  
  it('Should convert `{"b":2}`', () => {
      should(normalizedJSON({a: 1, b: 2}, {b:true})).be.equal('{"b":2}');
  });
  
  it('Should convert `{"b":2}` with func', () => {
      should(normalizedJSON({a: 1, b: 2}, () => ['b'])).be.equal('{"b":2}');
  });
  
  it('Should convert `{"a":{"c":3}}`', () => {
      should(normalizedJSON({a: {b: 2, c: 3}}, {a:{c:true}})).be.equal('{"a":{"c":3}}');
  });
});