# ng-parse-module [![Build Status](https://travis-ci.org/cgross/ng-parse-module.png?branch=master)](https://travis-ci.org/cgross/ng-parse-module)

> Small utility to read/write Angular module creation calls.

## Example

```js
var ngParseModule = require('ng-parse-module');

//read module from file
var results = ngParseModule('app.js');

//update module dependencies and rewrite
results.dependencies.modules.push('newDependency');
results.save();
```

## API

### ngParseModule(file)

Parses the file and returns an object the following properties:

 - `file` - Name of the file parsed. 
 - `name` - Name of the Angular module. 
 - `dependencies` - Object containing `start`, `end`, and `modules` properties. 
 - `contents` - Contents of the file parsed. 
 - `save` - Function that will rewrite the parsed file with any changes the `dependencies.modules` property reflected in the new source.


