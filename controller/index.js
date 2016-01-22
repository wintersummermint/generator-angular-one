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

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {

    angularOneUtils.getNameArg(this,args);

    yeoman.generators.Base.apply(this, arguments);

};

util.inherits(ControllerGenerator, yeoman.generators.Base);

ControllerGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [{
        type:'confirm',
        name: 'needpartial',
        message: 'Create this controller?',
        default: true
    }];

    angularOneUtils.addNamePrompt(this,prompts,'controller');

    this.prompt(prompts, function (props) {
        if (props.name){
            this.name = props.name;
        }
        this.needpartial = props.needpartial;
        angularOneUtils.askForModuleAndDir('controller',this,this.needpartial,cb);
    }.bind(this));

};

ControllerGenerator.prototype.files = function files() {

    var configName = 'controllerSimpleTemplates';
    var defaultDir = 'templates/simple';
    if (this.needpartial) {
        configName = 'controllerComplexTemplates';
        defaultDir = 'templates/complex';
    }

    this.htmlPath = path.join(this.dir,this.name + '.html').replace(/\\/g,'/');;

    angularOneUtils.processTemplates(this.name + '-controller',this.dir,'controller',this,defaultDir,configName,this.module);

};