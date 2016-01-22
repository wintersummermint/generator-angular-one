'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('underscore');
var esprima = require('esprima');

var save = function(){

    var modules = this.dependencies.modules.map(function(module){
        if (module[0] !== '\'' && module[0] !== '"') {
            module = '\'' + module + '\'';
        }
        return module;
    });

    var contents = this.contents.substring(0,
        this.dependencies.start) + ' [' + modules.join(', ') + ']' +
        this.contents.substring(this.dependencies.end);

    fs.writeFileSync(this.file,contents,'utf8');
};

exports.parse = function(file){

    var contents = fs.readFileSync(file,'utf8');
    var ast = esprima.parse(contents,{tokens:true,range:true});

    var pathToFind = [
            {type:'Identifier',value:'angular'},
            {type:'Punctuator',value:'.'},
            {type:'Identifier',value:'module'},
            {type:'Punctuator',value:'('},
            {type:'String'},
            {type:'Punctuator',value:','}
        ];

    var startIndex,endIndex;
    var modules = [];
    var moduleName;

    var compareTokens = function(a,b){
        return a.type === b.type && (a.value ? a.value === b.value : true);
    };

    _(ast.tokens).each(function(token,i){

        if (!startIndex){
            var matched = true;
            for (var j = 0; j < pathToFind.length; j++) {

                if (ast.tokens.length <= i + j || !compareTokens(pathToFind[j],ast.tokens[i + j])){
                    matched = false;
                    break;
                }
            }
            if (matched){
                startIndex = ast.tokens[i + pathToFind.length -1].range[1];
                moduleName = ast.tokens[i + pathToFind.length - 2].value;
                moduleName = moduleName.substring(1,moduleName.length-1);
            }
        }

        if (startIndex && !endIndex && token.type === 'Punctuator' && token.value === ')'){
            endIndex = token.range[0];
        }

        if (startIndex && !endIndex && token.range[0] > startIndex && token.type === 'String'){
            modules.push(token.value.substring(1,token.value.length -1));
        }

    });

    if (!startIndex || !endIndex) {
        return null;
    }

    var results = {
        file: path.resolve(file),
        name: moduleName,
        dependencies: {
            start: startIndex,
            end:endIndex,
            modules:modules
        },
        contents:contents
    };

    results.save = save.bind(results);

    return results;
};