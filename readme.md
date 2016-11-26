# NormJSON

![Travis CI](https://img.shields.io/travis/rumkin/normjson.png)

Convert JS values into JSON according to scheme of fields and orders. It useful
for hash algorithms to generate identical JSON in different js environments.

## Installation

```bash
npm i normjson
```

## Scheme types

Scheme could be presented in several ways.

### Array scheme

Array scheme contains list of properties which should be converted in specified
order.

```
normjson({a:1, b:2}, ['b', 'a']) => '{"b":2,"a":1}'
```

### Object scheme

Object scheme allow nesting.

```
normjson({a:{b: 1, c:2}}, {a:{c: true}}) => '{"a":{"c":2}}'
```

### Function scheme

Function as a scheme should return other type of scheme (array, object, no).
The first argument is a document.

### No scheme

If no scheme specified then properties sorting by name in ascending order.