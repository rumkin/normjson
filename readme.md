# NormJSON

![Travis CI](https://img.shields.io/travis/rumkin/normjson.png)

Convert JS values into JSON with key sorting. It can sort keys in ascending
order or according to scheme. It useful for hash algorithms to generate
deterministic JSON in different js environments.

## Installation

Install via npm
```bash
npm i normjson
```

Require from unpkg.com:

```html
<script src="https://unpkg.com/normjson@1.3.0/dist/normjson.js"
    integrity="St/z56cj/u6TzqsuQ/H0/ve0ZreNswh5UbYrgSCQyN58F/0s0FN6E+Ak3a8ZAy5q"
></script>
<script src="https://unpkg.com/normjson@1.3.0/dist/normjson.min.js"
    integrity="qPKIijQ3VZP98fNmZUtRxsDHGdqBNkAJLyg5jWwvQAhr16EBJqkkqFfpTkNmPM6h"
></script>
```

## Example

Normjson will create the same JSON string from objects with different props order and `JSON.stringify` does not:

```javascript
const object1 = {a: 1, b: 2};
const object2 = {b: 2, a: 1};

JSON.stringify(object1) === JSON.stringify(object2); // => false
normjson(object1) === normjson(object2); // => true
```

## Scheme types

### No scheme

If no scheme specified then properties sorting by name in ascending order:

```javascript
normjson({a:1, b:2, c: 3});
```

Coverts to:

```json
{"a":1,"b":2,"c":3}
```

Scheme could be presented in several ways.

### Array scheme

Array scheme contains list of properties which should be converted in specified
order.

```javascript
normjson({a:1, b:2, c: 3}, ['b', 'a']);
```

Convets to:
```json
{"b":2,"a":1}
```

It allow to specify *rest of props* with true and sorts them by key names:
```javascript
normjson({b: 3, c: 2, a: 1}, ['c', true]);
```

Coverts to:

```json
{"c":3,"a":1,"b":2}
```

Rest of props could be set as the first, the last or in the middle.


### Object scheme

Object scheme allow nesting.

```javascript
normjson({a:{b: 1, c:2}}, {a:{c: true}});
```

Coverts to:

```json
{"a":{"c":2}}
```

### Function scheme

Function as a scheme should return other type of scheme (array, object, no).
The first argument is a document.

## License

MIT.
