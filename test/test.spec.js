const should = require('should');
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

    it('Should convert head and tail from `["b", true, "a"]`', () => {
        should(normalizedJSON({a: 1, b: 2, c: 3}, ['b', true, 'a'])).be.equal('{"b":2,"c":3,"a":1}');
    });

    it('Should convert head from `["b", "c", true]`', () => {
        should(normalizedJSON({a: 1, b: 2, c: 3}, ['b', 'c', true])).be.equal('{"b":2,"c":3,"a":1}');
    });

    it('Should convert tailed from `[true, "f", "d"]`', () => {
        should(normalizedJSON({d: 1, e: 2, f: 3}, [true, 'f', 'd'])).be.equal('{"e":2,"f":3,"d":1}');
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

    it('Should convert `{"a":{"c":3, "b":2}}`', () => {
        should(normalizedJSON({a: {c: 3, b: 2}})).be.equal('{"a":{"b":2,"c":3}}');
    });

    it('Should convert `undefined` as empty string', () => {
        should(normalizedJSON(undefined)).be.equal(undefined);
    });

    it('Should convert `{a:undefined}` as empty object', () => {
        should(normalizedJSON({a:undefined})).be.equal('{}');
    });

    it('Should convert `[undefined, undefined]` as array of nulls', () => {
        should(normalizedJSON([undefined, undefined])).be.equal('[null,null]');
    });

    it('Should convert date `new Date(0)` to "1970-01-01T00:00:00.000Z"', () => {
        should(normalizedJSON(new Date(0))).be.equal('"1970-01-01T00:00:00.000Z"');
    });

    it('Should convert date `{a: []}` to `{"a":[]}`', () => {
        should(normalizedJSON({a:[]})).be.equal('{"a":[]}');
    });
});
