'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var path = require('path');
var angularOneUtils = require('../utils.js');
var chalk = require('chalk');
var _ = require('underscore');
var fs = require('fs');

_.str = require('underscore.string');
_.mixin(_.str.exports());

var DirectiveGenerator = module.exports = function DirectiveGenerator(args, options, config) {

    angularOneUtils.getNameArg(this,args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(DirectiveGenerator, yeoman.generators.Base);

DirectiveGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [{
        type:'confirm',
        name: 'needpartial',
        message: 'Create html view for this directive (e.g: feature.html)?',
        default: true
    }];

    angularOneUtils.addNamePrompt(this,prompts,'directive');

    this.prompt(prompts, function (props) {
        if (props.name){
            this.name = props.name;
        }
        this.needpartial = props.needpartial;
        angularOneUtils.askForModuleAndDir('directive',this,this.needpartial,cb);
    }.bind(this));

};

DirectiveGenerator.prototype.files = function files() {

    var configName = 'directiveSimpleTemplates';
    var defaultDir = 'templates/simple';
    if (this.needpartial) {
        configName = 'directiveComplexTemplates';
        defaultDir = 'templates/complex';
    }

    this.htmlPath = path.join(this.dir,this.name + '.html').replace(/\\/g,'/');;

    angularOneUtils.processTemplates(this.name,this.dir,'directive',this,defaultDir,configName,this.module);

};